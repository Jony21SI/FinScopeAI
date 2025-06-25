import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../User/entities/user.entity';

@Entity('savings_goals')
export class SavingsGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  target_amount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  current_amount: number;

  @Column({ nullable: true })
  deadline: Date;

  @Column({ nullable: true })
  priority: number;

  @CreateDateColumn()
  created_at: Date;
}
