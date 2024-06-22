import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCouponRequestDto {
  @ApiProperty({
    description: 'The Coupon string provided by seller',
    example: 'Slash200',
  })
  @IsString()
  @IsNotEmpty()
  coupon: string;

  @ApiProperty({
    description: 'The discount on the order when applying coupon',
    example: '200',
  })
  @IsNotEmpty()
  @IsNumber()
  discount: number;
}
