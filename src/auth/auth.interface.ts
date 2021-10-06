import { Request } from 'express';
import { User } from '../users/entities/user.entity';

export interface AuthModuleOptions {
  privateKey: string;
}

export interface AuthMiddlewareRequest extends Request {
  user: User;
}
