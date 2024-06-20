import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RemoveProductFromCartDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
