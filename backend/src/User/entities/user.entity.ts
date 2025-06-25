import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Income } from '../../incomes/entities/income.entity';
import { Expense } from 'src/expenses/entities/expenses.entity';
import { Category } from '../../categories/entities/category.entity';
import { SavingsGoal } from '../../saving-goals/entities/saving-goals.entity';
import { CreditCard } from '../../credit-cards/entities/credit-card.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  auth0Id: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Income, (income) => income.user)
  incomes: Income[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => SavingsGoal, (savingsGoal) => savingsGoal.user)
  savingsGoals: SavingsGoal[];

  @OneToMany(() => CreditCard, (creditCard) => creditCard.user)
  creditCards: CreditCard[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
