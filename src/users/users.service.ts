import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from '@src/common/dto/common.dto';
import { User } from '@src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';
import {
  FindByEmailInput,
  FindByIdInput,
  FindUserOutput,
} from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async findUser(
    input: FindByIdInput | FindByEmailInput,
  ): Promise<FindUserOutput> {
    const { id, email } = input;
    const user = await this.users.findOne(id ? { id } : { email });
    if (!user) return { ok: false, error: 'User not found' };
    return { ok: true, user };
  }

  async createUser(input: CreateUserInput): Promise<CoreOutput> {
    const { email } = input;
    const exist = await this.users.findOne({ email });
    if (exist) return { ok: false, error: 'User already exists' };
    await this.users.save(this.users.create(input));
    return { ok: true };
  }
}
