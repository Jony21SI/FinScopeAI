import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@Request() req) {
    return this.userService.findByAuth0Id(req.user.auth0Id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  updateCurrentUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserByAuth0Id(
      req.user.auth0Id,
      updateUserDto,
    );
  }
}
