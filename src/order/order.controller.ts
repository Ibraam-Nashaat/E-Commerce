import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { OrderStatus } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  createOrder(@Request() req) {
    return this.orderService.createOrder(req.user);
  }

  @Get(':orderId')
  getOrder(@Param('orderId') orderId: string, @Request() req) {
    return this.orderService.getOrder(Number(orderId), req.user);
  }

  @Put(':orderId/status')
  updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body('status') status: string,
    @Request() req,
  ) {
    return this.orderService.updateOrderStatus(
      Number(orderId),
      status,
      req.user,
    );
  }
}
