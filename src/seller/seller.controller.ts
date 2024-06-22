import { Body, Controller, Post } from '@nestjs/common';
import { AddProductRequestDto } from './dto/addProductRequest.dto';
import { SellerService } from './seller.service';
import { AddCouponRequestDto } from './dto/addCouponRequest.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SellerErrors } from './errors/seller.errors';
import { AddProductResponseDto } from './dto/addProductResponse.dto';
import { AddCouponResponseDto } from './dto/addCouponResponse.dto';

@ApiTags('Sellers')
@Controller('api/')
export class SellerController {
  constructor(private sellerService: SellerService) {}

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
  @ApiCreatedResponse({
    description: 'product added successfully',
    type: AddProductResponseDto,
  })
  @Post('products/add')
  addProduct(@Body() productData: AddProductRequestDto) {
    return this.sellerService.addProduct(productData);
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
    type: AddCouponResponseDto,
  })
  @Post('coupons/add')
  addCoupon(@Body() couponData: AddCouponRequestDto) {
    return this.sellerService.addCoupon(couponData);
  }
}
