import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expenses.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { ExpensesRepository } from './expenses.repository';
import { UserModule } from '../User/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), UserModule],
  controllers: [ExpensesController],
  providers: [ExpensesService, ExpensesRepository],
})
export class ExpensesModule {}
