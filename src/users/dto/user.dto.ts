import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@src/common/dto/common.dto';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class TokenOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
