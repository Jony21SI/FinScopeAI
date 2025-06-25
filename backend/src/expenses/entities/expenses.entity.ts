import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../User/entities/user.entity';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  date: Date;

  @Column()
  payment_method: 'cash' | 'debit' | 'credit_card' | 'transfer';

  @Column({ nullable: true })
  credit_card_name: string;

  @CreateDateColumn()
  created_at: Date;
}
