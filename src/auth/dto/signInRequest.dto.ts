import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({
    description: 'Email',
    example: 'john@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'John@1234',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
