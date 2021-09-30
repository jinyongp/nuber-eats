import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async create(input: CreateUserInput): Promise<[boolean, string?]> {
    const { email } = input;
    const exist = await this.users.findOne({ email });
    if (exist) return [false, 'Email already exists'];
    await this.users.save(this.users.create(input));
    return [true];
  }
}
