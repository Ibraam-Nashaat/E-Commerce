import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddProductResponseDto {
  @ApiProperty({
    description: 'product id',
    example: '1',
  })
  productId: number;

  @ApiProperty({
    description: 'product name',
    example: 'T-shirt',
  })
  name: string;

  @ApiProperty({
    description: 'product description',
    example: 'White T-shirt',
  })
  description: string;

  @ApiProperty({
    description: 'product price',
    example: '350',
  })
  price: number;

  @ApiProperty({
    description: 'product stock',
    example: '25',
  })
  stock: number;

  @ApiProperty({
    description: 'product category',
    example: 'Sports',
  })
  category: string;

  @ApiProperty({
    description: 'product creation date',
    example: '2024-06-22T10:55:10.684Z',
  })
  createdAt: Date;
}
