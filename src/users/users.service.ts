import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';
import { FindByEmailInput, FindByIdInput } from './dto/find-user.dto';
import { SignInInput } from './dto/sign-in.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { UserOutput } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
  ) {}

  async findUser(input: FindByIdInput | FindByEmailInput): Promise<UserOutput> {
    const { id, email } = input;
    const user = await this.users.findOne(id ? { id } : { email });
    if (!user) return { error: 'User not found' };
    return { user };
  }

  async signIn(input: SignInInput): Promise<UserOutput> {
    const { email, password } = input;
    const user = await this.users.findOne(
      { email },
      { select: ['id', 'password'] },
    );
    if (!user) return { error: 'User not found' };

    const check = await user.checkPassword(password);
    if (!check) return { error: 'Wrong password' };

    return { user };
  }

  async createUser(input: CreateUserInput): Promise<UserOutput> {
    const { email } = input;
    const exist = await this.users.findOne({ email });
    if (exist) return { error: 'User already exists' };
    const user = await this.users.save(this.users.create(input));
    await this.verifications.save(this.verifications.create({ user }));
    return { user };
  }

  async updateUser(user: User, input: UpdateUserInput): Promise<UserOutput> {
    Object.assign(user, input);
    if (input.email) {
      user.emailVerified = false;
      await this.verifications.delete({ user: { id: user.id } });
      const verification = this.verifications.create({ user });
      await this.verifications.save(verification);
    }
    await this.users.save(user);
    return { user };
  }

  async verifyEmail(code: string): Promise<boolean> {
    const verification = await this.verifications.findOne(
      { code },
      { relations: ['user'] },
    );
    if (verification) {
      verification.user.emailVerified = true;
      await this.users.save(verification.user);
      await this.verifications.delete(verification.id);
      return true;
    }
    return false;
  }
}
