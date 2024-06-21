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
import { ApplyCouponDto } from './dto/applyCoupon.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/orders/apply-coupon')
  applyCoupon(@Request() req, @Body() data: ApplyCouponDto) {
    return this.orderService.applyCoupon(data.coupon, data.orderId, req.user);
  }

  @Get('/users/orders')
  getOrdersHistory(@Request() req) {
    return this.orderService.getOrdersHistory(req.user);
  }

  @Post('orders')
  createOrder(@Request() req) {
    return this.orderService.createOrder(req.user);
  }

  @Get('orders/:orderId')
  getOrder(@Param('orderId') orderId: string, @Request() req) {
    return this.orderService.getOrder(Number(orderId), req.user);
  }

  @Put('orders/:orderId/status')
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
