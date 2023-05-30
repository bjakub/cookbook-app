import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UsersService } from './users.service';
import { catchErrors } from 'src/utils/catchErrors';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const isUserExist = await this.usersService.getUserByEmail(
        createUserDto.email,
      );

      if (isUserExist) {
        throw new ConflictException('User with this email exists.');
      }

      const createdUser = this.usersService.create(createUserDto);
      return createdUser;
    } catch (e) {
      catchErrors(e);
    }
  }

  @Get()
  async getAllUsers() {
    try {
      const users = await this.usersService.getAllUsers();

      if (users.length === 0)
        throw new NotFoundException('Users do not exist.');

      return users;
    } catch (e) {
      catchErrors(e);
    }
  }

  @Get(':id')
  async getSpecifiedUser(@Param('id') id: string) {
    try {
      const user = await this.usersService.getUserById(id);
      if (!user) throw new NotFoundException('User does not exists');
      return user;
    } catch (e) {
      catchErrors(e);
    }
  }
}
