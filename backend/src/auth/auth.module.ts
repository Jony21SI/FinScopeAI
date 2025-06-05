import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/User/user.module';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [UserModule],
  providers: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
