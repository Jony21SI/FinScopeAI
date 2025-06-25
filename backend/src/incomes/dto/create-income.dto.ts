import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateIncomeDto {
  @IsNumber()
  amount: number;

  @IsString()
  source: string;

  @IsEnum(['monthly', 'bi-weekly', 'weekly', 'one-time'])
  frequency: 'monthly' | 'bi-weekly' | 'weekly' | 'one-time';

  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsNotEmpty()
  userId: string;
}
