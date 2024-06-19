import { IS_STRONG_PASSWORD, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, isStrongPassword } from 'class-validator';

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
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  address: string;

}
