import { User } from '@src/users/entities/user.entity';
import { Request } from 'express';

export interface DynamicModuleOptions {
  privateKey: string;
}

export interface MiddlewareRequest extends Request {
  user: User;
}
