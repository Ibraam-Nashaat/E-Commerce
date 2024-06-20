import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AddProductToCartDto } from './dto/addProductToCart.dto';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('/add')
  addToCart(@Body() productData: AddProductToCartDto, @Request() req) {
    return this.cartService.addToCart(productData, req.user);
  }

  @Put('/update')
  updateCart(@Body() productData: AddProductToCartDto, @Request() req) {
    return this.cartService.updateCart(productData, req.user);
  }
}
