import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly service: IncomesService) {}

  @Post()
  create(@Body() dto: CreateIncomeDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateIncomeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
