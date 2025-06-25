import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../User/entities/user.entity';

@Entity('incomes')
export class Income {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.incomes)
  user: User;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  source: string;

  @Column()
  frequency: 'monthly' | 'bi-weekly' | 'weekly' | 'one-time';

  @Column()
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;
}
