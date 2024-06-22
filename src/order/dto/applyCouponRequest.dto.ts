import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApplyCouponRequestDto {
  @ApiProperty({
    description: 'The Coupon string',
    example: 'Slash200',
  })
  @IsNotEmpty()
  @IsString()
  coupon: string;

  @ApiProperty({
    description: 'The order id that you want to apply coupon to',
    example: '2',
  })
  @IsNotEmpty()
  @IsNumber()
  orderId: number;
}
