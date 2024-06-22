import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderStatusRequestDto {
  @ApiProperty({
    description: 'The status of the order',
    example: 'Pending',
  })
  @IsNotEmpty()
  @IsString()
  status: string;
}
