import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByAuth0Id(auth0Id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { auth0Id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUserByAuth0Id(
    auth0Id: string,
    dto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findByAuth0Id(auth0Id);
    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async findOrCreate(
    auth0Id: string,
    email: string,
    name: string,
  ): Promise<User> {
    let user = await this.userRepository.findOne({ where: { auth0Id } });

    if (!user) {
      user = this.userRepository.create({ auth0Id, email, name });
      await this.userRepository.save(user);
    }

    return user;
  }
}
