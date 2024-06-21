import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCouponDto {

  @IsString()
  @IsNotEmpty()
  coupon: string;

  @IsNotEmpty()
  @IsNumber()
  discount: number;
}
