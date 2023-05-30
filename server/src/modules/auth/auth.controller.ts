import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from '../users/dtos/CreateUserDto';
import { UsersService } from '../users/users.service';
import { catchErrors } from 'src/utils/catchErrors';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      return this.authService.login(req.user);
    } catch (e) {
      catchErrors(e);
    }
  }

  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      return this.authService.signUp(createUserDto);
    } catch (e) {
      catchErrors(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const {
      user: { userId },
    } = req;

    try {
      const findUser = await this.usersService.getUserById(userId);
      return {
        name: findUser.name,
      };
    } catch (e) {
      catchErrors(e);
    }
  }
}
