import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersService } from '../users/users.service';
import { AuthMiddlewareRequest } from './auth.interface';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async use(req: AuthMiddlewareRequest, res: Response, next: NextFunction) {
    try {
      if (!req.headers['access_token']) return next();
      const decoded = this.authService.verify(
        req.headers['access_token'].toString(),
      );
      if (typeof decoded === 'string') return next();

      const { user } = await this.userService.findUser({ id: decoded.id });
      if (!user) return next();
      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      next();
    }
  }
}
