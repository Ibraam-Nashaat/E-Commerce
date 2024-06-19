import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, isStrongPassword } from 'class-validator';

export class SignInDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;

}
