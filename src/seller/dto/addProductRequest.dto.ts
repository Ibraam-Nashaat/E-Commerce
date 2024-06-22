import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddProductRequestDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'T-shirt',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'White T-shirt',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: '350',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The available stock of the product',
    example: '25',
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: 'The category of the product',
    example: 'Sports',
  })
  @IsNotEmpty()
  @IsString()
  category: string;
}
