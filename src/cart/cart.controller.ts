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

@UseGuards(AuthGuard('jwt'))
@Controller('api/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCartItems(@Request() req) {
    return this.cartService.getCartItems(req.user);
  }
  
  @Post('/add')
  addToCart(@Body() productData: AddOrUpdateProductDto, @Request() req) {
    return this.cartService.addToCart(productData, req.user);
  }

  @Put('/update')
  updateCart(@Body() productData: AddOrUpdateProductDto, @Request() req) {
    return this.cartService.updateCart(productData, req.user);
  }

  @Delete('/remove')
  removeProductFromCart(
    @Body() productData: RemoveProductFromCartDto,
    @Request() req,
  ) {
    return this.cartService.removeProductFromCart(productData, req.user);
  }
}
