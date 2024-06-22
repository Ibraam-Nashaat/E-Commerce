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
import { AddOrUpdateProductDto } from './dto/addOrUpdateProduct.dto';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { RemoveProductFromCartDto } from './dto/removeProductFromCart.dto';
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

@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'unauthorized' })
@ApiTags('Carts')
@UseGuards(AuthGuard('jwt'))
@Controller('api/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @ApiOkResponse({
    description: 'cart items retrieved successfully',
  })
  @Get()
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
  })
  @Post('/add')
  addToCart(@Body() productData: AddOrUpdateProductDto, @Request() req) {
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
  @ApiOkResponse({ description: 'cart updated successfully' })
  @Put('/update')
  updateCart(@Body() productData: AddOrUpdateProductDto, @Request() req) {
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
    @Body() productData: RemoveProductFromCartDto,
    @Request() req,
  ) {
    return this.cartService.removeProductFromCart(productData, req.user.userId);
  }
}
