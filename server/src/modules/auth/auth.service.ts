import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { catchErrors } from 'src/utils/catchErrors';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.getUserByEmail(email);
      if (user && bcrypt.compare(user.password, pass)) {
        const { password, ...result } = user;
        return result;
      }
      throw new UnauthorizedException('Users or password are incorrect.');
    } catch (e) {
      catchErrors(e);
    }
  }
}
