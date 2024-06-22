import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCouponResponseDto {
  @ApiProperty({
    description: 'coupon id',
    example: '1',
  })
  couponId: number;

  @ApiProperty({
    description: 'The Coupon string provided by seller',
    example: 'Slash200',
  })
  coupon: string;

  @ApiProperty({
    description: 'The discount on the order when applying coupon',
    example: '200',
  })
  discount: number;
}
