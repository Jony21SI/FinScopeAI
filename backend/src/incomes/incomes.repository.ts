import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Income } from './entities/income.entity';

@Injectable()
export class IncomesRepository {
  constructor(
    @InjectRepository(Income)
    private readonly repo: Repository<Income>,
  ) {}

  create(data: Partial<Income>) {
    return this.repo.create(data);
  }

  save(income: Income) {
    return this.repo.save(income);
  }

  findAll(userId: string) {
    return this.repo.find({
      where: { user: { auth0Id: userId } },
      relations: ['user'],
    });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['user'] });
  }

  update(id: string, data: Partial<Income>) {
    return this.repo.update(id, data);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
