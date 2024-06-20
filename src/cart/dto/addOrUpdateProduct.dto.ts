import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddOrUpdateProductDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
