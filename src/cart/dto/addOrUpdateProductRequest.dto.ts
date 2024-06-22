import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddOrUpdateProductRequestDto {
  @ApiProperty({
    description: 'The id of the product that you want to add to cart',
    example: '5',
  })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: 'The quantity of the product that you want to add to cart',
    example: '3',
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
