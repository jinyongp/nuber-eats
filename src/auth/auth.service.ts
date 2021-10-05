import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '@src/common/constants';
import jwt from 'jsonwebtoken';
import { AuthModuleOptions } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: AuthModuleOptions,
  ) {}

  sign(id: number): string {
    return jwt.sign({ id }, this.options.privateKey);
  }

  verify(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, this.options.privateKey);
  }
}
