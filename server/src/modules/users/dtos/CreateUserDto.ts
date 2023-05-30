import { IsEmail, IsIn, IsString, Matches } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';
import { UserRole } from 'src/types/UserRole.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  // one lowercase char, one uppercase char, one digits, one special char
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/, {
    message:
      'Password must contain at least: one lowercase char, one uppercase char, one digit, one special char',
  })
  password: string;

  @Match('password')
  confirmPassword: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsIn(Object.values(UserRole))
  role: UserRole;
}
