import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(payload: { userId: number }) {
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

    if (cartItems.length == 0)
      throw new BadRequestException("Can't create order from empty cart");

    const productMap = await this.checkForStockMismatch(cartItems);
    await this.addOrderItems(cartItems, productMap, user.userId);
  }

  private async checkForStockMismatch(cartItems) {
    const productIds = cartItems.map((item) => item.productId);

    const productsList = await this.prisma.products.findMany({
      where: {
        productId: {
          in: productIds,
        },
      },
    });

    const productMap = productsList.reduce((map, product) => {
      map[product.productId] = product;
      return map;
    }, {});

    const stockConflicts = cartItems.filter((item) => {
      const product = productMap[item.productId];
      return product.stock < item.quantity;
    });

    if (stockConflicts.length > 0) {
      throw new ConflictException({
        error: 'One or more items exceed available stock.',
        conflicts: stockConflicts.map((item) => ({
          productId: item.productId,
          availableStock: productMap[item.productId].stock,
          requestedQuantity: item.quantity,
        })),
      });
    }
    return productMap;
  }

  private async addOrderItems(cartItems, productMap, userId: number) {
    const order = await this.prisma.orders.create({
      data: {
        userId: userId,
        status: 'Pending',
        total: cartItems.reduce((sum, item) => {
          const product = productMap[item.productId];
          return sum + product.price * item.quantity;
        }, 0),
      },
    });

    const orderItemsData = cartItems.map((item) => ({
      orderId: order.orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: productMap[item.productId].price,
    }));

    await this.prisma.orderItems.createMany({
      data: orderItemsData,
    });

    await Promise.all(
      cartItems.map((item) => {
        return this.prisma.products.update({
          where: { productId: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }),
    );

    await this.prisma.cartItems.deleteMany({
      where: { cartId: cartItems[0].cartId },
    });
  }
}
