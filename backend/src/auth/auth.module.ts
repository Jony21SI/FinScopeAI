import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/User/user.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ProtectedController } from './auth.controller';

@Module({
  imports: [UserModule],
  providers: [JwtStrategy, JwtAuthGuard],
  controllers: [ProtectedController],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
