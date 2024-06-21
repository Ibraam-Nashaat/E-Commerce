import { ApiProperty } from '@nestjs/swagger';
import { IS_STRONG_PASSWORD, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, isStrongPassword } from 'class-validator';

export class SignUpDto {
  
  @ApiProperty({
    description:'Name of the user',
    example:'John Moris'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description:'Email of the user',
    example:'john@gmail.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  

  @ApiProperty({
    description:'Password of the user',
    example:'John@1234'
  })
  @IsNotEmpty()
  @IsString()
  password: string;


  @ApiProperty({
    description:'Phone number of the user',
    example:'+201204567891'
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description:'Address of the user',
    example:'Mourad Street, Giza, Egypt'
  })
  @IsNotEmpty()
  address: string;

}
