import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expenses.entity';

@Injectable()
export class ExpensesRepository {
  constructor(
    @InjectRepository(Expense)
    private readonly repo: Repository<Expense>,
  ) {}

  create(data: Partial<Expense>) {
    return this.repo.create(data);
  }

  save(expense: Expense) {
    return this.repo.save(expense);
  }

  findAll(userId: string) {
    return this.repo.find({
      where: { user: { auth0Id: userId } },
      relations: ['user'],
    });
  }

  findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  update(id: string, data: Partial<Expense>) {
    return this.repo.update(id, data);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }

  async getTotalExpenses(): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total')
      .getRawOne();
    return Number(result.total) || 0;
  }
}
