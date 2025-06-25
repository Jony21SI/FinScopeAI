import { Injectable } from '@nestjs/common';
import { CreateSavingsGoalDto } from './dto/create-saving-goals.dto';
import { UpdateSavingsGoalDto } from './dto/update-saving-goals.dto';
import { SavingsGoalsRepository } from './saving-goals.repository';
import { UserService } from '../User/user.service';
import { SavingsGoal } from './entities/saving-goals.entity';

@Injectable()
export class SavingsGoalsService {
  constructor(
    private readonly repo: SavingsGoalsRepository,
    private readonly usersService: UserService,
  ) {}

  async create(dto: CreateSavingsGoalDto) {
    const user = await this.usersService.findByAuth0Id(dto.userId);
    const goalData = {
      name: dto.name,
      target_amount: dto.target_amount,
      current_amount: dto.current_amount || 0,
      deadline: dto.deadline ? new Date(dto.deadline) : undefined,
      priority: dto.priority,
      user,
    };
    const goal = this.repo.create(goalData);
    return this.repo.save(goal);
  }

  findAll(userId: string) {
    return this.repo.findAll(userId);
  }

  findOne(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, dto: UpdateSavingsGoalDto) {
    const updateData: Partial<SavingsGoal> = {};
    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.target_amount !== undefined)
      updateData.target_amount = dto.target_amount;
    if (dto.current_amount !== undefined)
      updateData.current_amount = dto.current_amount;
    if (dto.deadline !== undefined)
      updateData.deadline = new Date(dto.deadline);
    if (dto.priority !== undefined) updateData.priority = dto.priority;
    return this.repo.update(id, updateData);
  }

  remove(id: string) {
    return this.repo.remove(id);
  }
}
