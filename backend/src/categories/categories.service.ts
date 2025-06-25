import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { CategoriesRepository } from './categories.repository';
import { UserService } from '../User/user.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly repo: CategoriesRepository,
    private readonly usersService: UserService,
  ) {}

  async create(dto: CreateCategoryDto) {
    const user = dto.userId
      ? await this.usersService.findByAuth0Id(dto.userId)
      : undefined;

    const categoryData = {
      name: dto.name,
      icon: dto.icon,
      parent_category_id: dto.parent_category_id,
      is_default: dto.is_default,
      user,
    };

    const category = this.repo.create(categoryData);
    return this.repo.save(category);
  }

  findAll(userId: string) {
    return this.repo.findAll(userId);
  }

  findOne(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, dto: UpdateCategoryDto) {
    const updateData: Partial<Category> = {};
    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.icon !== undefined) updateData.icon = dto.icon;
    if (dto.parent_category_id !== undefined)
      updateData.parent_category_id = dto.parent_category_id;
    if (dto.is_default !== undefined) updateData.is_default = dto.is_default;
    return this.repo.update(id, updateData);
  }

  remove(id: string) {
    return this.repo.remove(id);
  }
}
