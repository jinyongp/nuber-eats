import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '@src/common/dto/common.dto';
import { User, UserWithoutPassword } from '../entities/user.entity';

@InputType()
export class FindByIdInput {
  @Field(() => Int)
  id!: number;
  email!: undefined;
}

@InputType()
export class FindByEmailInput extends PickType(User, ['email']) {
  id!: undefined;
}

@ObjectType()
export class FindUserOutput extends CoreOutput {
  @Field(() => UserWithoutPassword, { nullable: true })
  user?: UserWithoutPassword;
}
