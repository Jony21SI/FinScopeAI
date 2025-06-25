import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingsGoal } from './entities/saving-goals.entity';
import { SavingsGoalsController } from './saving-goals.controller';
import { SavingsGoalsService } from './saving-goals.service';
import { SavingsGoalsRepository } from './saving-goals.repository';
import { UserModule } from '../User/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SavingsGoal]), UserModule],
  controllers: [SavingsGoalsController],
  providers: [SavingsGoalsService, SavingsGoalsRepository],
})
export class SavingsGoalsModule {}
