import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './User/user.module';
import { IncomesModule } from './incomes/incomes.module';
import { ExpensesModule } from './expenses/expenses.module';
import { CategoriesModule } from './categories/categories.module';
import { SavingsGoalsModule } from './saving-goals/saving-goals.module';
import { CreditCardsModule } from './credit-cards/credit-cards.module';
import { AuthModule } from './auth/auth.module';

import { User } from './User/entities/user.entity';
import { Income } from './incomes/entities/income.entity';
import { Expense } from './expenses/entities/expenses.entity';
import { Category } from './categories/entities/category.entity';
import { SavingsGoal } from './saving-goals/entities/saving-goals.entity';
import { CreditCard } from './credit-cards/entities/credit-card.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'finscopedb',
      entities: [User, Income, Expense, Category, SavingsGoal, CreditCard],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    IncomesModule,
    ExpensesModule,
    CategoriesModule,
    SavingsGoalsModule,
    CreditCardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
