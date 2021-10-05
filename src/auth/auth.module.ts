import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from '@src/common/constants';
import { AuthModuleOptions } from './auth.interface';
import { AuthService } from './auth.service';

@Module({})
@Global()
export class AuthModule {
  static forRoot(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      exports: [AuthService],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        AuthService,
      ],
    };
  }
}
