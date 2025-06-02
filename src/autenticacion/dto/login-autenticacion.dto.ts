import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAutentDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
