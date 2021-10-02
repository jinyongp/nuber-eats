import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HandleError } from '@src/common/common.decorator';
import { CreateUserInput } from './dto/create-user.dto';
import { FindByEmailInput, FindByIdInput } from './dto/find-user.dto';
import { SignInInput } from './dto/sign-in.dto';
import { TokenOutput, UserOutput } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserOutput)
  @HandleError()
  async findById(@Args('input') input: FindByIdInput): Promise<UserOutput> {
    return this.usersService.findUser(input);
  }

  @Query(() => UserOutput)
  @HandleError()
  async findByEmail(
    @Args('input') input: FindByEmailInput,
  ): Promise<UserOutput> {
    return this.usersService.findUser(input);
  }

  @Mutation(() => TokenOutput)
  @HandleError()
  async signIn(
    @Args('input') { email, password }: SignInInput,
  ): Promise<TokenOutput> {
    const { error, user } = await this.usersService.findUser({ email });
    if (!user) return { error };

    const check = await user.checkPassword(password);
    if (!check) return { error: 'Wrong password' };

    return { token: '1234' };
  }

  @Mutation(() => UserOutput)
  @HandleError()
  async createUser(@Args('input') input: CreateUserInput): Promise<UserOutput> {
    return this.usersService.createUser(input);
  }
}
