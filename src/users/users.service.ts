import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MutationOutput } from '@src/common/dto/common.dto';
import { User } from '@src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';
import { FindUserInput, FindUserOutput } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async findById({ id }: FindUserInput): Promise<FindUserOutput> {
    const user = await this.users.findOne({ id });
    if (!user) return { ok: false, error: 'User not found' };
    return { ok: true, user };
  }

  async create(input: CreateUserInput): Promise<MutationOutput> {
    const { email } = input;
    const exist = await this.users.findOne({ email });
    if (exist) return { ok: false, error: 'User already exists' };
    await this.users.save(this.users.create(input));
    return { ok: true };
  }
}
