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
import { ApplyCouponRequestDto } from './dto/applyCouponRequest.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateOrderStatusRequestDto } from './dto/updateOrderStatusRequest.dto';
import { OrderErrors } from './errors/order.errors';
import { OrderActionResponseDto } from './dto/orderActionResponse.dto';
import { type } from 'os';
import { GetOrderResponseDto } from './dto/getOrderResponse.dto';

@ApiUnauthorizedResponse({ description: 'unauthorized' })
@ApiBearerAuth()
@ApiTags('Orders')
@UseGuards(AuthGuard('jwt'))
@Controller('api')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiNotFoundResponse({
    description: [OrderErrors.couponNotFound, OrderErrors.orderIdNotFound].join(
      '<br>',
    ),
  })
  @ApiCreatedResponse({
    description: 'coupon applied to order successfully',
    type: OrderActionResponseDto,
  })
  @Post('/orders/apply-coupon')
  applyCoupon(@Body() data: ApplyCouponRequestDto) {
    return this.orderService.applyCoupon(data.coupon, data.orderId);
  }

  @ApiOkResponse({
    description: 'orders history retrieved successfully',
    type: GetOrderResponseDto,
    isArray: true,
  })
  @Get('/users/orders')
  getOrdersHistory(@Request() req) {
    return this.orderService.getOrdersHistory(req.user.userId);
  }

  @ApiBadRequestResponse({
    description: OrderErrors.emptyCart,
  })
  @ApiConflictResponse({
    description: OrderErrors.cartItemsExceedStock,
  })
  @ApiCreatedResponse({ description: 'order created successfully' })
  @Post('orders')
  createOrder(@Request() req) {
    return this.orderService.createOrder(req.user.userId);
  }

  @ApiNotFoundResponse({
    description: OrderErrors.orderIdNotFound,
  })
  @ApiOkResponse({
    description: 'order was retrieved successfully',
    type: GetOrderResponseDto,
  })
  @Get('orders/:orderId')
  getOrder(@Param('orderId') orderId: string) {
    return this.orderService.getOrder(Number(orderId));
  }

  @ApiNotFoundResponse({
    description: OrderErrors.orderIdNotFound,
  })
  @ApiBadRequestResponse({ description: OrderErrors.invalidOrderStatus })
  @ApiOkResponse({
    description: 'order status updated successfully',
    type: OrderActionResponseDto,
  })
  @Put('orders/:orderId/status')
  updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() status: UpdateOrderStatusRequestDto,
  ) {
    return this.orderService.updateOrderStatus(Number(orderId), status.status);
  }
}
