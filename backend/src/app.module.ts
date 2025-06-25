import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { IncomesModule } from './incomes/incomes.module';
import { ExpensesModule } from './expenses/expenses.module';
import { CategoriesModule } from './categories/categories.module';
import { SavingsGoalsModule } from './saving-goals/saving-goals.module';
import { CreditCardsModule } from './credit-cards/credit-cards.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User/entities/user.entity';
import { Income } from './incomes/entities/income.entity';
import { Expense } from './expenses/entities/expenses.entity';
import { Category } from './categories/entities/category.entity';
import { SavingsGoal } from './saving-goals/entities/saving-goals.entity';
import { CreditCard } from './credit-cards/entities/credit-card.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'finscopedb',
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
