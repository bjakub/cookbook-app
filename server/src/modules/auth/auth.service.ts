import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserDto } from './dtos/SignUpUserDto';
import { UserRole } from 'src/types/UserRole.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.getUserByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  login(user: any) {
    const { email, role, _id } = user._doc;

    const payload = {
      email,
      role,
      sub: _id,
    };

    const access_token = this.jwtService.sign(payload);
    const exp = +process.env.JWT_TOKEN_EXPIRED_TIME_IN_SECONDS * 1000;

    return {
      access_token,
      exp: Date.now() + exp,
    };
  }

  async signUp(user: SignUpUserDto) {
    const isUserExist = await this.usersService.getUserByEmail(user.email);

    if (isUserExist) {
      throw new ConflictException('User with this email exists.');
    }

    const createdUser = await this.usersService.create({
      ...user,
      role: UserRole.USER,
    });

    const payload = {
      email: createdUser.email,
      role: createdUser.role,
      sub: createdUser._id,
    };

    const access_token = this.jwtService.sign(payload);
    const exp = +process.env.JWT_TOKEN_EXPIRED_TIME_IN_SECONDS * 1000;

    return {
      access_token,
      exp: Date.now() + exp,
    };
  }
}
