import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from '@src/common/dto/common.dto';
import { User } from '../entities/user.entity';

@InputType()
export class FindUserInput {
  @Field(() => Int)
  id!: number;
}

@ObjectType()
export class FindUserOutput extends MutationOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
