import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SavingsGoalsService } from './saving-goals.service';
import { CreateSavingsGoalDto } from './dto/create-saving-goals.dto';
import { UpdateSavingsGoalDto } from './dto/update-saving-goals.dto';

@Controller('savings-goals')
export class SavingsGoalsController {
  constructor(private readonly service: SavingsGoalsService) {}

  @Post()
  create(@Body() dto: CreateSavingsGoalDto) {
    return this.service.create(dto);
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.service.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSavingsGoalDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
