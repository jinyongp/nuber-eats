import { InputType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class SignInInput extends PickType(User, ['email', 'password']) {}
