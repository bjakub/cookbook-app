import { IsEmail, Matches } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  // one lowercase char, one uppercase char, one digits, one special char
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/)
  password: string;
}
