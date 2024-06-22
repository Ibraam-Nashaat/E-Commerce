import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RemoveProductFromCartRequestDto {
  @ApiProperty({
    description: 'The id of the product that you want to remove from cart',
    example: '5',
  })
  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
