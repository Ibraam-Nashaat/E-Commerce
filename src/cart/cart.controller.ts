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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Carts')
@UseGuards(AuthGuard('jwt'))
@Controller('api/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCartItems(@Request() req) {
    return this.cartService.getCartItems(req.user.userId);
  }
  
  @Post('/add')
  addToCart(@Body() productData: AddOrUpdateProductDto, @Request() req) {
    return this.cartService.addToCart(productData, req.user.userId);
  }

  @Put('/update')
  updateCart(@Body() productData: AddOrUpdateProductDto, @Request() req) {
    return this.cartService.updateCart(productData, req.user.userId);
  }

  @Delete('/remove')
  removeProductFromCart(
    @Body() productData: RemoveProductFromCartDto,
    @Request() req,
  ) {
    return this.cartService.removeProductFromCart(productData, req.user.userId);
  }
}
