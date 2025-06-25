import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsDateString()
  date: string;

  @IsEnum(['cash', 'debit', 'credit_card', 'transfer'])
  payment_method: 'cash' | 'debit' | 'credit_card' | 'transfer';

  @IsOptional()
  @IsString()
  credit_card_name?: string;

  @IsNotEmpty()
  userId: string;
}
