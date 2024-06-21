import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddOrUpdateProductDto } from './dto/addOrUpdateProduct.dto';
import { RemoveProductFromCartDto } from './dto/removeProductFromCart.dto';
import { CartErrors } from './errors';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async addToCart(productData: AddOrUpdateProductDto, userId: number) {
    const product = await this.prisma.products.findUnique({
      where: {
        productId: productData.productId,
      },
    });

    if (!product) throw new NotFoundException(CartErrors.productNotFoundError);

    const cart = await this.prisma.carts.findUnique({
      where: {
        userId: userId,
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

  async updateCart(productData: AddOrUpdateProductDto, userId: number) {
    const product = await this.prisma.products.findUnique({
      where: {
        productId: productData.productId,
      },
    });

    if (!product) throw new NotFoundException(CartErrors.productNotFoundError);

    const cart = await this.prisma.carts.findUnique({
      where: {
        userId: userId,
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

    if (!cartItem)
      throw new NotFoundException(CartErrors.productNotFoundInCartError);
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
    userId: number,
  ) {
    const cart = await this.prisma.carts.findUnique({
      where: {
        userId: userId,
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

    if (!cartItem)
      throw new NotFoundException(CartErrors.productNotFoundInCartError);
    cartItem = await this.prisma.cartItems.delete({
      where: {
        cartId_productId: {
          cartId: cart.cartId,
          productId: productData.productId,
        },
      },
    });
  }

  async getCartItems(userId: number) {
    const cart = await this.prisma.carts.findUnique({
      where: {
        userId: userId,
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
