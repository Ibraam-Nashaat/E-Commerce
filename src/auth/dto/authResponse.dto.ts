import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class AuthResponseDto {
  @ApiProperty({
    description: 'id of the user',
    example: '1',
  })
  userId: number;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Moris',
  })
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+201204567891',
  })
  phone: string;

  @ApiProperty({
    description: 'Address of the user',
    example: 'Mourad Street, Giza, Egypt',
  })
  address: string;

  @ApiProperty({
    description: 'Account creation date',
    example: '2024-06-22T10:55:10.684Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'jwt',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5MDUzNzEwLCJleHAiOjE3MTkwNTczMTB9.xAhjEUGcM4EMFrtOki0Bi3Q70BpHEzgUq8tJ22Jh2to',
  })
  jwt: string;
}
