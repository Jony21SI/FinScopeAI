import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  create(data: Partial<Category>) {
    return this.repo.create(data);
  }

  save(category: Category) {
    return this.repo.save(category);
  }

  findAll(userId: string) {
    return this.repo.find({
      where: [
        { user: { auth0Id: userId } },
        { user: IsNull(), is_default: true },
      ],
    });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: string, data: Partial<Category>) {
    return this.repo.update(id, data);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
