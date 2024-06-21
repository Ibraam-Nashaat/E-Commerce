import { ConflictException, Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/addProduct.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCouponDto } from './dto/addCoupon.dto';
import { Coupons } from '@prisma/client';

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

  async addCoupon(couponData: AddCouponDto) {
    let coupon: Coupons;
    try {
      coupon = await this.prisma.coupons.create({
        data: {
          coupon: couponData.coupon,
          discount: couponData.discount,
        },
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ConflictException('Coupon already exists');
      }
      throw e;
    }

    return coupon;
  }
}
