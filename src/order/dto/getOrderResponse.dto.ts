import { ApiProperty } from '@nestjs/swagger';
import { OrderItems } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetOrderResponseDto {
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
    example: '300',
  })
  total: number;

  @ApiProperty({
    description: 'items of the order',
    example: '[{orderId: 1, productId: 1, quantity: 3, price: 300}]',
  })
  items: OrderItems[];
}
