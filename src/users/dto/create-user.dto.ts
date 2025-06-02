import { IsString, IsEmail, IsInt, Min, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  readonly edad?: number;

  @IsString()
  readonly password: string;
}
