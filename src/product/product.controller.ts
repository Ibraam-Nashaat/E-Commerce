import { Body, Controller, Post } from '@nestjs/common';
import { AddProductDto } from './dto/addProduct.dto';
import { ProductService } from './product.service';
import { AddCouponDto } from './dto/addCoupon.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sellers')
@Controller('api/')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('products/add')
  addProduct(@Body() productData: AddProductDto) {
    return this.productService.addProduct(productData);
  }

  @Post('coupons/add')
  addCoupon(@Body() couponData: AddCouponDto) {
    return this.productService.addCoupon(couponData);
  }
}
