import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HandleError } from '@src/common/common.decorator';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { FindUserInput, FindUserOutput } from './dto/find-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => FindUserOutput)
  @HandleError()
  async findUser(@Args('input') input: FindUserInput): Promise<FindUserOutput> {
    return this.usersService.findById(input);
  }

  @Mutation(() => CreateUserOutput)
  @HandleError()
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.usersService.create(input);
  }
}
