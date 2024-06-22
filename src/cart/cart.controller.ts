import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AddOrUpdateProductRequestDto } from './dto/addOrUpdateProductRequest.dto';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { RemoveProductFromCartRequestDto } from './dto/removeProductFromCartRequest.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CartErrors } from './errors/cart.errors';
import { GetCartItemsResponseDto } from './dto/getCartItemsResponse.dto';

@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'unauthorized' })
@ApiTags('Carts')
@UseGuards(AuthGuard('jwt'))
@Controller('api/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @ApiOkResponse({
    description: 'cart items retrieved successfully',
    type: GetCartItemsResponseDto,
    isArray: true,
  })
  @Get('/:userId')
  getCartItems(@Request() req) {
    return this.cartService.getCartItems(req.user.userId);
  }

  @ApiBadRequestResponse({
    description: [
      CartErrors.productIdIsNotNumber,
      CartErrors.productIdIsEmpty,
      CartErrors.quantityIsNotNumber,
      CartErrors.quantityIsEmpty,
    ].join('<br>'),
  })
  @ApiNotFoundResponse({
    description: CartErrors.productNotFound,
  })
  @ApiCreatedResponse({
    description: 'product added to cart successfully',
    type: GetCartItemsResponseDto,
  })
  @Post('/add')
  addToCart(@Body() productData: AddOrUpdateProductRequestDto, @Request() req) {
    return this.cartService.addToCart(productData, req.user.userId);
  }

  @ApiBadRequestResponse({
    description: [
      CartErrors.productIdIsNotNumber,
      CartErrors.productIdIsEmpty,
      CartErrors.quantityIsNotNumber,
      CartErrors.quantityIsEmpty,
    ].join('<br>'),
  })
  @ApiNotFoundResponse({
    description: [
      CartErrors.productNotFound,
      CartErrors.productNotFoundInCart,
    ].join('<br>'),
  })
  @ApiOkResponse({
    description: 'cart updated successfully',
    type: GetCartItemsResponseDto,
  })
  @Put('/update')
  updateCart(
    @Body() productData: AddOrUpdateProductRequestDto,
    @Request() req,
  ) {
    return this.cartService.updateCart(productData, req.user.userId);
  }

  @ApiBadRequestResponse({
    description: [
      CartErrors.productIdIsEmpty,
      CartErrors.productIdIsNotNumber,
    ].join('<br>'),
  })
  @ApiNotFoundResponse({
    description: CartErrors.productNotFoundInCart,
  })
  @ApiOkResponse({
    description: 'product removed from cart successfully',
  })
  @Delete('/remove')
  removeProductFromCart(
    @Body() productData: RemoveProductFromCartRequestDto,
    @Request() req,
  ) {
    return this.cartService.removeProductFromCart(productData, req.user.userId);
  }
}
