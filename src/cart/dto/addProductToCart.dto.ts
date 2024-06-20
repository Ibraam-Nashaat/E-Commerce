import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddProductToCartDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
