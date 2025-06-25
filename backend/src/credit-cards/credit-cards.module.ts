import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from './entities/credit-card.entity';
import { CreditCardsController } from './credit-cards.controller';
import { CreditCardsService } from './credit-cards.service';
import { CreditCardsRepository } from './credit-cards.repository';
import { UserModule } from '../User/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard]), UserModule],
  controllers: [CreditCardsController],
  providers: [CreditCardsService, CreditCardsRepository],
  exports: [CreditCardsService],
})
export class CreditCardsModule {}
