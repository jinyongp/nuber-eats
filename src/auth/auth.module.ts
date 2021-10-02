import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from './auth.constant';
import { DynamicModuleOptions } from './auth.interface';
import { AuthService } from './auth.service';

@Module({})
@Global()
export class AuthModule {
  static forRoot(options: DynamicModuleOptions): DynamicModule {
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
