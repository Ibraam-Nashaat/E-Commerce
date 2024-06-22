import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetCartItemsResponseDto {
  @ApiProperty({
    description: 'The id of the cart',
    example: '1',
  })
  cartId: number;

  @ApiProperty({
    description: 'The id of the product that you want to add to cart',
    example: '5',
  })
  productId: number;

  @ApiProperty({
    description: 'The quantity of the product that you want to add to cart',
    example: '3',
  })
  quantity: number;
}
