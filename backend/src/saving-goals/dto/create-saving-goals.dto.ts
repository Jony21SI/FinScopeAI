import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSavingsGoalDto {
  @IsString()
  name: string;

  @IsNumber()
  target_amount: number;

  @IsOptional()
  @IsNumber()
  current_amount?: number;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsNumber()
  priority?: number;

  @IsNotEmpty()
  userId: string;
}
