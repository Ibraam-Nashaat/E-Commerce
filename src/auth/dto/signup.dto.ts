import { IS_STRONG_PASSWORD, IsEmail, IsNotEmpty, IsString, IsStrongPassword, isStrongPassword } from 'class-validator';

export class SignUpDto {
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  address: string;

}
