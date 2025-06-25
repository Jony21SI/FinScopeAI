import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCreditCardDto {
  @IsString()
  bank: string;

  @IsString()
  nickname: string;

  @IsNumber()
  credit_limit: number;

  @IsInt()
  cutoff_day: number;

  @IsInt()
  payment_due_day: number;

  @IsNotEmpty()
  userId: string;
}
