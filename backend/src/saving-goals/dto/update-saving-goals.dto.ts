import { PartialType } from '@nestjs/mapped-types';
import { CreateSavingsGoalDto } from './create-saving-goals.dto';

export class UpdateSavingsGoalDto extends PartialType(CreateSavingsGoalDto) {}
