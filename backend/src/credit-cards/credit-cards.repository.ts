import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditCard } from './entities/credit-card.entity';

@Injectable()
export class CreditCardsRepository {
  constructor(
    @InjectRepository(CreditCard)
    private readonly repo: Repository<CreditCard>,
  ) {}

  create(data: Partial<CreditCard>) {
    return this.repo.create(data);
  }

  save(card: CreditCard) {
    return this.repo.save(card);
  }

  findAll(userId: string) {
    return this.repo.find({
      where: { user: { auth0Id: userId } },
      relations: ['user'],
    });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['user'] });
  }

  update(id: string, data: Partial<CreditCard>) {
    return this.repo.update(id, data);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
