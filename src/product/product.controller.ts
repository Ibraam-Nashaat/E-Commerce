import { Body, Controller, Post } from '@nestjs/common';
import { AddProductDto } from './dto/addProduct.dto';
import { ProductService } from './product.service';
import { AddCouponDto } from './dto/addCoupon.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Sellers')
@Controller('api/')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiBadRequestResponse({
    description: [
      'name must be a string',
      'name should not be empty',
      'description should not be empty',
      'description must be a string',
      'price must be a number conforming to the specified constraints',
      'price should not be empty',
      'stock must be a number conforming to the specified constraints',
      'stock should not be empty',
      'category must be a string',
      'category should not be empty',
    ].join('<br>'),
  })
  @ApiCreatedResponse({ description: 'product added successfully' })
  @Post('products/add')
  addProduct(@Body() productData: AddProductDto) {
    return this.productService.addProduct(productData);
  }

  @ApiConflictResponse({
    description: 'Coupon already exists',
  })
  @ApiBadRequestResponse({
    description: [
      'coupon should not be empty',
      'coupon must be a string',
      'discount must be a number conforming to the specified constraints',
      'discount should not be empty',
    ].join('<br>'),
  })
  @ApiCreatedResponse({
    description: 'coupon added successfully',
  })
  @Post('coupons/add')
  addCoupon(@Body() couponData: AddCouponDto) {
    return this.productService.addCoupon(couponData);
  }
}
