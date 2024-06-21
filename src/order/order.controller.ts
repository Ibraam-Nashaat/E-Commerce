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
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrderStatusDto } from './dto/updateOrderStatus.dto';

@ApiTags('Orders')
@UseGuards(AuthGuard('jwt'))
@Controller('api')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/orders/apply-coupon')
  applyCoupon(@Request() req, @Body() data: ApplyCouponDto) {
    return this.orderService.applyCoupon(data.coupon, data.orderId, req.user.userId);
  }

  @Get('/users/orders')
  getOrdersHistory(@Request() req) {
    return this.orderService.getOrdersHistory(req.user.userId);
  }

  @Post('orders')
  createOrder(@Request() req) {
    return this.orderService.createOrder(req.user.userId);
  }

  @Get('orders/:orderId')
  getOrder(@Param('orderId') orderId: string, @Request() req) {
    return this.orderService.getOrder(Number(orderId));
  }

  @Put('orders/:orderId/status')
  updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() status: UpdateOrderStatusDto,
    @Request() req,
  ) {
    return this.orderService.updateOrderStatus(
      Number(orderId),
      status.status,
    );
  }
}
