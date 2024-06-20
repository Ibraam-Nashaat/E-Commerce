import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddOrUpdateProductDto } from './dto/addOrUpdateProduct.dto';
import { Users } from '@prisma/client';
import { RemoveProductFromCartDto } from './dto/removeProductFromCart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async addToCart(
    productData: AddOrUpdateProductDto,
    payload: { userId: number },
  ) {
    const user = await this.prisma.users.findUnique({
      where: {
        userId: payload.userId,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const product = await this.prisma.products.findUnique({
      where: {
        productId: productData.productId,
      },
    });

    if (!product) throw new NotFoundException('Product not found');

    const cart = await this.prisma.carts.findUnique({
      where: {
        userId: user.userId,
      },
    });

    let cartItem = await this.prisma.cartItems.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.cartId,
          productId: productData.productId,
        },
      },
    });

    if (cartItem) {
      cartItem = await this.prisma.cartItems.update({
        where: {
          cartId_productId: {
            cartId: cart.cartId,
            productId: productData.productId,
          },
        },
        data: {
          quantity: productData.quantity,
        },
      });
    } else {
      cartItem = await this.prisma.cartItems.create({
        data: {
          cartId: cart.cartId,
          productId: productData.productId,
          quantity: productData.quantity,
        },
      });
    }

    return cartItem;
  }

  async updateCart(
    productData: AddOrUpdateProductDto,
    payload: { userId: number },
  ) {
    const user = await this.prisma.users.findUnique({
      where: {
        userId: payload.userId,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const product = await this.prisma.products.findUnique({
      where: {
        productId: productData.productId,
      },
    });

    if (!product) throw new NotFoundException('Product not found');

    const cart = await this.prisma.carts.findUnique({
      where: {
        userId: user.userId,
      },
    });

    let cartItem = await this.prisma.cartItems.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.cartId,
          productId: productData.productId,
        },
      },
    });

    if (!cartItem) throw new NotFoundException('Product not found in cart');
    cartItem = await this.prisma.cartItems.update({
      where: {
        cartId_productId: {
          cartId: cart.cartId,
          productId: productData.productId,
        },
      },
      data: {
        quantity: productData.quantity,
      },
    });

    return cartItem;
  }

  async removeProductFromCart(
    productData: RemoveProductFromCartDto,
    payload: { userId: number },
  ) {
    const user = await this.prisma.users.findUnique({
      where: {
        userId: payload.userId,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const cart = await this.prisma.carts.findUnique({
      where: {
        userId: user.userId,
      },
    });

    let cartItem = await this.prisma.cartItems.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.cartId,
          productId: productData.productId,
        },
      },
    });

    if (!cartItem) throw new NotFoundException('Product not found in cart');
    cartItem = await this.prisma.cartItems.delete({
      where: {
        cartId_productId: {
          cartId: cart.cartId,
          productId: productData.productId,
        },
      },
    });

    return { status: 'Product removed from cart successfully' };
  }

  async getCartItems(payload: { userId: number }) {
    const user = await this.prisma.users.findUnique({
      where: {
        userId: payload.userId,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const cart = await this.prisma.carts.findUnique({
      where: {
        userId: user.userId,
      },
    });

    let cartItems = await this.prisma.cartItems.findMany({
      where: {
        cartId: cart.cartId,
      },
    });

    return cartItems;
  }
}
