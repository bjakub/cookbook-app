import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      return await this.usersService.getUserByEmail(email);
    } catch (e) {
      throw new HttpException(
        'INTERNAL ERROR during fetching user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
