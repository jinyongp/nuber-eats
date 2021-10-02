import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from '@src/auth/auth.decorator';
import { AuthService } from '@src/auth/auth.service';
import { HandleError } from '@src/common/common.decorator';
import { CreateUserInput } from './dto/create-user.dto';
import { FindByEmailInput, FindByIdInput } from './dto/find-user.dto';
import { SignInInput } from './dto/sign-in.dto';
import { TokenOutput, UserOutput } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

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

  // @UseGuards(AuthGuard)
  @Query(() => UserOutput)
  @HandleError()
  async getCurrentUser(@AuthUser() user: User): Promise<UserOutput> {
    if (!user) return { error: 'No User Authenticated' };
    return { user };
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

    const token = this.authService.sign(user.id);
    return { token };
  }

  @Mutation(() => UserOutput)
  @HandleError()
  async createUser(@Args('input') input: CreateUserInput): Promise<UserOutput> {
    return this.usersService.createUser(input);
  }
}
