import { User } from '@src/users/entities/user.entity';
import { Request } from 'express';

export interface AuthModuleOptions {
  privateKey: string;
}

export interface AuthMiddlewareRequest extends Request {
  user: User;
}
