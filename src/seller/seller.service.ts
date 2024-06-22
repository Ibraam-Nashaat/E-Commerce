import { ConflictException, Injectable } from '@nestjs/common';
import { AddProductRequestDto } from './dto/addProductRequest.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCouponRequestDto } from './dto/addCouponRequest.dto';
import { Coupons } from '@prisma/client';
import { SellerErrors } from './errors/seller.errors';
import { AddProductResponseDto } from './dto/addProductResponse.dto';
import { AddCouponResponseDto } from './dto/addCouponResponse.dto';

@Injectable()
export class SellerService {
  constructor(private prisma: PrismaService) {}
  async addProduct(productData: AddProductRequestDto) {
    const product: AddProductResponseDto = await this.prisma.products.create({
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

  async addCoupon(couponData: AddCouponRequestDto) {
    let coupon: AddCouponResponseDto;
    try {
      coupon = await this.prisma.coupons.create({
        data: {
          coupon: couponData.coupon,
          discount: couponData.discount,
        },
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ConflictException(SellerErrors.couponExists);
      }
      throw e;
    }

    return coupon;
  }
}
