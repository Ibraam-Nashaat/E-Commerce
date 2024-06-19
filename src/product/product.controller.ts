import { Body, Controller, Post } from '@nestjs/common';
import { AddProductDto } from './dto/addProduct.dto';
import { ProductService } from './product.service';

@Controller('api/products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('add')
  addProduct(@Body() productData: AddProductDto) {
    return this.productService.addProduct(productData);
  }
}
