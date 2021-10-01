import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HandleError } from '@src/common/common.decorator';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import {
  FindByEmailInput,
  FindByIdInput,
  FindUserOutput,
} from './dto/find-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => FindUserOutput)
  @HandleError()
  async findById(@Args('input') input: FindByIdInput): Promise<FindUserOutput> {
    return this.usersService.findUser(input);
  }

  @Query(() => FindUserOutput)
  @HandleError()
  async findByEmail(
    @Args('input') input: FindByEmailInput,
  ): Promise<FindUserOutput> {
    return this.usersService.findUser(input);
  }

  @Mutation(() => CreateUserOutput)
  @HandleError()
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.usersService.createUser(input);
  }
}
