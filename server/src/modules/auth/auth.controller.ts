import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dtos/LoginUserDto';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Request() req) {
    return req.user;
  }
}
