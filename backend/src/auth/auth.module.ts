import { Module } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/User/user.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ProtectedController } from './auth.controller';

@Module({
  imports: [UserModule],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    Reflector,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [ProtectedController],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
