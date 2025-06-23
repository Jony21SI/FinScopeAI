import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth0CallbackDto } from './dto/auth0-callback.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('auth0-callback')
  async handleAuth0Callback(@Body() auth0CallbackDto: Auth0CallbackDto) {
    return this.userService.handleAuth0Callback(auth0CallbackDto);
  }

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
