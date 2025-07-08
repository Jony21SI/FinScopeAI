import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expenses.dto';
import { UpdateExpenseDto } from './dto/update-expenses.dto';
import { ExpensesRepository } from './expenses.repository';
import { UserService } from '../User/user.service';
import { Expense } from './entities/expenses.entity';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ExpensesService {
  constructor(
    private readonly repo: ExpensesRepository,
    private readonly usersService: UserService,
  ) {}

  async create(dto: CreateExpenseDto) {
    const user = await this.usersService.findByAuth0Id(dto.userId);
    let category = dto.category;
    if (!category || category.trim() === '') {
      category = await this.categorizeExpense(dto.description);
    }
    const expenseData = {
      amount: dto.amount,
      description: dto.description,
      category,
      date: new Date(dto.date),
      payment_method: dto.payment_method,
      credit_card_name: dto.credit_card_name,
      user,
    };
    const expense = this.repo.create(expenseData);
    return this.repo.save(expense);
  }

  private async categorizeExpense(description: string): Promise<string> {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that categorizes expenses.',
        },
        {
          role: 'user',
          content: `Categorize the following expense description into one of these categories: Food, Transport, Utilities, Entertainment, Health, Shopping, Other.\n\nDescription: "${description}"\nCategory:`,
        },
      ],
      max_completion_tokens: 10,
      temperature: 0,
    });
    const category = response.choices[0]?.message?.content?.trim() || 'Other';
    return category;
  }

  findAll(userId: string) {
    return this.repo.findAll(userId);
  }

  findOne(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, dto: UpdateExpenseDto) {
    const updateData: Partial<Expense> = {};
    if (dto.amount !== undefined) updateData.amount = dto.amount;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.category !== undefined) updateData.category = dto.category;
    if (dto.date !== undefined) updateData.date = new Date(dto.date);
    if (dto.payment_method !== undefined)
      updateData.payment_method = dto.payment_method;
    if (dto.credit_card_name !== undefined)
      updateData.credit_card_name = dto.credit_card_name;
    return this.repo.update(id, updateData);
  }

  remove(id: string) {
    return this.repo.remove(id);
  }
}
