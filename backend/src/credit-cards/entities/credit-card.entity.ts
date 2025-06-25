import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../User/entities/user.entity';

@Entity('credit_cards')
export class CreditCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  bank: string;

  @Column()
  nickname: string;

  @Column('decimal', { precision: 10, scale: 2 })
  credit_limit: number;

  @Column()
  cutoff_day: number;

  @Column()
  payment_due_day: number;

  @CreateDateColumn()
  created_at: Date;
}
