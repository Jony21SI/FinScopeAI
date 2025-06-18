import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';

@Controller('protected')
export class ProtectedController {
  @Public()
  @Get('test')
  getTest() {
    console.log('Protected test endpoint called!');
    return {
      message: 'Backend is working!',
      timestamp: new Date().toISOString(),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getProtected(@Request() req) {
    console.log('Protected endpoint called');
    console.log('User from request:', req.user);

    return {
      message: 'You accessed a protected route!',
      user: req.user,
      timestamp: new Date().toISOString(),
    };
  }
}
