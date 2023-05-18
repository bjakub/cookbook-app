import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { LoginUserDto } from './dtos/LoginUserDto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Request() req) {
    return req.user;
  }
}
