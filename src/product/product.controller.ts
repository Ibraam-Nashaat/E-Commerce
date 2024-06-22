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
import { SellerErrors } from './errors/seller.errors';

@ApiTags('Sellers')
@Controller('api/')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiBadRequestResponse({
    description: [
      SellerErrors.nameNotString,
      SellerErrors.nameIsEmpty,
      SellerErrors.descriptionIsEmpty,
      SellerErrors.descriptionNotString,
      SellerErrors.priceIsNotNumber,
      SellerErrors.priceIsEmpty,
      SellerErrors.stockIsNotNumber,
      SellerErrors.stockIsEmpty,
      SellerErrors.categoryIsNotString,
      SellerErrors.categoryIsEmpty,
    ].join('<br>'),
  })
  @ApiCreatedResponse({ description: 'product added successfully' })
  @Post('products/add')
  addProduct(@Body() productData: AddProductDto) {
    return this.productService.addProduct(productData);
  }

  @ApiConflictResponse({
    description: SellerErrors.couponExists,
  })
  @ApiBadRequestResponse({
    description: [
      SellerErrors.couponIsEmpty,
      SellerErrors.couponIsNotString,
      SellerErrors.discountIsNotNumber,
      SellerErrors.discountIsEmpty,
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
