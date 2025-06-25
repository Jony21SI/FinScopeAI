import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expenses.dto';
import { UpdateExpenseDto } from './dto/update-expenses.dto';
import { ExpensesRepository } from './expenses.repository';
import { UserService } from '../User/user.service';
import { Expense } from './entities/expenses.entity';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly repo: ExpensesRepository,
    private readonly usersService: UserService,
  ) {}

  async create(dto: CreateExpenseDto) {
    const user = await this.usersService.findByAuth0Id(dto.userId);
    const expenseData = {
      amount: dto.amount,
      description: dto.description,
      category: dto.category,
      date: new Date(dto.date),
      payment_method: dto.payment_method,
      credit_card_name: dto.credit_card_name,
      user,
    };
    const expense = this.repo.create(expenseData);
    return this.repo.save(expense);
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
