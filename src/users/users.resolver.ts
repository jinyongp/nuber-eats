import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HandleError } from '@src/common/common.decorator';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  dummy(): string {
    return 'hi';
  }

  @Mutation(() => CreateUserOutput)
  @HandleError()
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<CreateUserOutput> {
    const [ok, error] = await this.usersService.create(input);
    return { ok, error };
  }
}
