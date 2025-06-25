import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';
import { IncomesRepository } from './incomes.repository';
import { Income } from './entities/income.entity';
import { UserModule } from '../User/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Income]), UserModule],
  controllers: [IncomesController],
  providers: [IncomesService, IncomesRepository],
})
export class IncomesModule {}
