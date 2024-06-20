import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post()
  createOrder(@Request() req) {
    return this.orderService.createOrder(req.user);
  }
}
