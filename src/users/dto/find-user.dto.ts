import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class FindByIdInput {
  @Field(() => Int)
  id!: number;
  email?: undefined;
}

@InputType()
export class FindByEmailInput extends PickType(User, ['email']) {
  id?: undefined;
}
