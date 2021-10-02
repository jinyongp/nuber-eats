import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@src/common/dto/common.dto';
import { User, UserWithoutPassword } from '@src/users/entities/user.entity';

@ObjectType()
export class UserOutput extends CoreOutput {
  @Field(() => UserWithoutPassword, { nullable: true })
  user?: User;
}

@ObjectType()
export class TokenOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
