import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { IncomesRepository } from './incomes.repository';
import { UserService } from '../User/user.service';
import { Income } from './entities/income.entity';

@Injectable()
export class IncomesService {
  constructor(
    private readonly repo: IncomesRepository,
    private readonly usersService: UserService,
  ) {}

  async create(dto: CreateIncomeDto) {
    const user = await this.usersService.findByAuth0Id(dto.userId);
    const incomeData = {
      amount: dto.amount,
      source: dto.source,
      frequency: dto.frequency,
      start_date: new Date(dto.start_date),
      end_date: dto.end_date ? new Date(dto.end_date) : undefined,
      user,
    };
    const income = this.repo.create(incomeData);
    return this.repo.save(income);
  }

  findAll(userId: string) {
    return this.repo.findAll(userId);
  }

  findOne(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, dto: UpdateIncomeDto) {
    const updateData: Partial<Income> = {};
    if (dto.amount !== undefined) updateData.amount = dto.amount;
    if (dto.source !== undefined) updateData.source = dto.source;
    if (dto.frequency !== undefined) updateData.frequency = dto.frequency;
    if (dto.start_date !== undefined)
      updateData.start_date = new Date(dto.start_date);
    if (dto.end_date !== undefined)
      updateData.end_date = new Date(dto.end_date);
    return this.repo.update(id, updateData);
  }

  remove(id: string) {
    return this.repo.remove(id);
  }
}
