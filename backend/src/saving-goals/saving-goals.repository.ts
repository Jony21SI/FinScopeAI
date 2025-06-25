import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavingsGoal } from './entities/saving-goals.entity';

@Injectable()
export class SavingsGoalsRepository {
  constructor(
    @InjectRepository(SavingsGoal)
    private readonly repo: Repository<SavingsGoal>,
  ) {}

  create(data: Partial<SavingsGoal>) {
    return this.repo.create(data);
  }

  save(goal: SavingsGoal) {
    return this.repo.save(goal);
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

  update(id: string, data: Partial<SavingsGoal>) {
    return this.repo.update(id, data);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
