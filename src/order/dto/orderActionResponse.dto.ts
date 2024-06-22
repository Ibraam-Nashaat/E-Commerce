import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrderActionResponseDto {
  @ApiProperty({
    description: 'order id',
    example: '1',
  })
  orderId: number;

  @ApiProperty({
    description: 'user id',
    example: '2',
  })
  userId: number;

  @ApiProperty({
    description: 'order date',
    example: '2024-06-22T10:55:10.684Z',
  })
  orderDate: Date;

  @ApiProperty({
    description: 'The status of the order',
    example: 'Pending',
  })
  status: string;

  @ApiProperty({
    description: 'order total amount',
    example: '2400',
  })
  total: number;
}
