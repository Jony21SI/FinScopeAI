import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expenses.dto';
import { UpdateExpenseDto } from './dto/update-expenses.dto';
import { ExpensesRepository } from './expenses.repository';
import { UserService } from '../User/user.service';
import { Expense } from './entities/expenses.entity';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

// In-memory cache for expense categorization
const expenseCategoryCache: Record<
  string,
  { main_category: string; subcategory: string }
> = {};

@Injectable()
export class ExpensesService {
  constructor(
    private readonly repo: ExpensesRepository,
    private readonly usersService: UserService,
  ) {}

  async create(dto: CreateExpenseDto) {
    const user = await this.usersService.findByAuth0Id(dto.userId);
    let main_category = dto.main_category;
    let subcategory = dto.subcategory;
    // Use a normalized key for caching
    const descKey = dto.description.trim().toLowerCase();

    if (
      !main_category ||
      !subcategory ||
      main_category.trim() === '' ||
      subcategory.trim() === ''
    ) {
      if (expenseCategoryCache[descKey]) {
        ({ main_category, subcategory } = expenseCategoryCache[descKey]);
      } else {
        ({ main_category, subcategory } = await this.categorizeExpense(
          dto.description,
        ));
        expenseCategoryCache[descKey] = { main_category, subcategory };
      }
    }
    main_category = main_category?.trim();
    subcategory = subcategory?.trim();

    const expenseData = {
      amount: dto.amount,
      description: dto.description,
      main_category,
      subcategory,
      date: new Date(dto.date),
      payment_method: dto.payment_method,
      credit_card_name: dto.credit_card_name,
      user,
    };
    console.log('Expense to save:', expenseData); // Debug log
    const expense = this.repo.create(expenseData);
    return this.repo.save(expense);
  }

  private async categorizeExpense(
    description: string,
  ): Promise<{ main_category: string; subcategory: string }> {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant that categorizes expenses for personal finance. Given an expense description, return both a main_category and a subcategory from the following options.\n\nMain categories: Food, Transport, Utilities, Entertainment, Health, Shopping, Financial, Education, Travel, Other\nSubcategories for Food: Groceries, Restaurants, Coffee Shops, Fast Food, Bars, Other\nSubcategories for Transport: Public Transport, Taxi/Rideshare, Fuel, Parking, Other\nSubcategories for Utilities: Electricity, Water, Gas, Internet, Phone, Other\nSubcategories for Entertainment: Movies, Concerts, Streaming, Events, Other\nSubcategories for Health: Pharmacy, Doctor, Dentist, Insurance, Other\nSubcategories for Shopping: Clothing, Electronics, Home, Gifts, Other\nSubcategories for Financial: Bank Fees, Investments, Insurance, Other\nSubcategories for Education: Tuition, Books, Courses, Other\nSubcategories for Travel: Flights, Hotels, Car Rental, Other\nSubcategories for Other: Other\n\nReturn your answer in this JSON format: {"main_category": "...", "subcategory": "..."}`,
        },
        {
          role: 'user',
          content: `Description: "${description}"`,
        },
      ],
      max_completion_tokens: 50,
      temperature: 0,
    });
    const json = response.choices[0]?.message?.content?.trim();
    console.log('OpenAI raw response:', json); // Debug log
    try {
      const parsed = JSON.parse(
        json ?? '{"main_category": "Other", "subcategory": "Other"}',
      );
      console.log('Parsed OpenAI response:', parsed); // Debug log
      return parsed;
    } catch (e) {
      return { main_category: 'Other', subcategory: 'Other' };
    }
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

  getTotalExpenses() {
    return this.repo.getTotalExpenses();
  }
}
