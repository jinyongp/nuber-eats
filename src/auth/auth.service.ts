import { Inject, Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from './auth.constant';
import { DynamicModuleOptions } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: DynamicModuleOptions,
  ) {}

  sign(id: number): string {
    return jwt.sign({ id }, this.options.privateKey);
  }

  verify(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, this.options.privateKey);
  }
}
