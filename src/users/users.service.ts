import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';
import { FindByEmailInput, FindByIdInput } from './dto/find-user.dto';
import { UserOutput } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async findUser(input: FindByIdInput | FindByEmailInput): Promise<UserOutput> {
    const { id, email } = input;
    const user = await this.users.findOne(id ? { id } : { email });
    if (!user) return { error: 'User not found' };
    return { user };
  }

  async createUser(input: CreateUserInput): Promise<UserOutput> {
    const { email } = input;
    const exist = await this.users.findOne({ email });
    if (exist) return { error: 'User already exists' };
    const user = this.users.create(input);
    await this.users.save(user);
    return { user };
  }
}
