import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from '@src/common/dto/common.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateUserOutput extends MutationOutput {}
