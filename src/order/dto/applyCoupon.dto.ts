import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApplyCouponDto {
  @IsNotEmpty()
  @IsString()
  coupon: string;

  @IsNotEmpty()
  @IsNumber()
  orderId: number;
}
