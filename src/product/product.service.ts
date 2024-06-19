import { Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/addProduct.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async addProduct(productData: AddProductDto) {
    const product = await this.prisma.products.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        category: productData.category,
      },
    });

    return product;
  }
}
