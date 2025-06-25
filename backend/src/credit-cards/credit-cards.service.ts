import { Injectable } from '@nestjs/common';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
import { CreditCardsRepository } from './credit-cards.repository';
import { UserService } from '../User/user.service';
import { CreditCard } from './entities/credit-card.entity';

@Injectable()
export class CreditCardsService {
  constructor(
    private readonly repo: CreditCardsRepository,
    private readonly usersService: UserService,
  ) {}

  async create(dto: CreateCreditCardDto) {
    const user = await this.usersService.findByAuth0Id(dto.userId);
    const cardData = {
      bank: dto.bank,
      nickname: dto.nickname,
      credit_limit: dto.credit_limit,
      cutoff_day: dto.cutoff_day,
      payment_due_day: dto.payment_due_day,
      user,
    };
    const card = this.repo.create(cardData);
    return this.repo.save(card);
  }

  findAll(userId: string) {
    return this.repo.findAll(userId);
  }

  findOne(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, dto: UpdateCreditCardDto) {
    const updateData: Partial<CreditCard> = {};
    if (dto.bank !== undefined) updateData.bank = dto.bank;
    if (dto.nickname !== undefined) updateData.nickname = dto.nickname;
    if (dto.credit_limit !== undefined)
      updateData.credit_limit = dto.credit_limit;
    if (dto.cutoff_day !== undefined) updateData.cutoff_day = dto.cutoff_day;
    if (dto.payment_due_day !== undefined)
      updateData.payment_due_day = dto.payment_due_day;
    return this.repo.update(id, updateData);
  }

  remove(id: string) {
    return this.repo.remove(id);
  }
}
