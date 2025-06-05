import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProtected(@Request() req) {
    return {
      message: 'You accessed a protected route!',
      user: req.user,
    };
  }
}
