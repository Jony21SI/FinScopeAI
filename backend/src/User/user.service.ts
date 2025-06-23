import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth0CallbackDto } from './dto/auth0-callback.dto';

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
    email?: string,
    name?: string,
  ): Promise<User> {
    let user = await this.userRepository.findOne({ where: { auth0Id } });

    if (!user) {
      const userData: Partial<User> = {
        auth0Id,
        email: email || undefined,
        name: name || undefined,
      };
      user = this.userRepository.create(userData);
      await this.userRepository.save(user);
    }

    return user;
  }

  async handleAuth0Callback(auth0CallbackDto: Auth0CallbackDto): Promise<User> {
    const { auth0Id, email, name } = auth0CallbackDto;

    let user = await this.userRepository.findOne({ where: { auth0Id } });

    if (!user) {
      // Create new user
      const userData: Partial<User> = {
        auth0Id,
        email: email || undefined,
        name: name || undefined,
      };
      user = this.userRepository.create(userData);
    } else {
      // Update existing user with latest info from Auth0
      if (email && email !== user.email) {
        user.email = email;
      }
      if (name && name !== user.name) {
        user.name = name;
      }
    }

    return this.userRepository.save(user);
  }
}
