import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async applyCoupon(
    coupon: string,
    orderId: number,
    payload: { userId: number },
  ) {
    const user = await this.prisma.users.findUnique({
      where: {
        userId: payload.userId,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const couponData = await this.prisma.coupons.findUnique({
      where: {
        coupon: coupon,
      },
    });

    if (!couponData) throw new NotFoundException('Coupon not found');

    const order = await this.prisma.orders.findUnique({
      where: {
        orderId: orderId,
      },
    });

    if (!order) throw new NotFoundException('No order exists with this id');

    const updatedOrder = await this.prisma.orders.update({
      where: {
        orderId: orderId,
      },
      data: {
        total: Math.max(order.total - couponData.discount, 0),
      },
    });

    return updatedOrder;
  }

  async getOrdersHistory(payload: { userId: number }) {
    const user = await this.prisma.users.findUnique({
      where: {
        userId: payload.userId,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const orders = await this.prisma.orders.findMany({
      where: {
        userId: user.userId,
      },
    });

    const ordersIds = orders.map((order) => order.orderId);

    const ordersItemsList = await this.prisma.orderItems.findMany({
      where: {
        orderId: {
          in: ordersIds,
        },
      },
    });

    let ordersHistory = {};
    for (let i = 0; i < orders.length; i++) {
      ordersHistory[orders[i].orderId] = {
        orderId: orders[i].orderId,
        date: orders[i].orderDate,
        status: orders[i].status,
        total: orders[i].total,
        items: [],
      };
    }

    for (let i = 0; i < ordersItemsList.length; i++) {
      ordersHistory[ordersItemsList[i].orderId].items.push({
        productId: ordersItemsList[i].productId,
        quantity: ordersItemsList[i].quantity,
        price: ordersItemsList[i].price,
      });
    }

    return Object.values(ordersHistory);
  }

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

  async getOrder(orderId: number, payload: { userId: number }) {
    const user = await this.prisma.users.findUnique({
      where: {
        userId: payload.userId,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const order = await this.prisma.orders.findUnique({
      where: {
        orderId: orderId,
      },
    });

    if (!order) throw new NotFoundException('No order with this id exists');

    const orderItems = await this.prisma.orderItems.findMany({
      where: {
        orderId: orderId,
      },
    });

    return {
      id: orderId,
      date: order.orderDate,
      status: order.status,
      total: order.total,
      items: orderItems,
    };
  }

  async updateOrderStatus(
    orderId: number,
    status: string,
    payload: { userId: number },
  ) {
    const user = await this.prisma.users.findUnique({
      where: {
        userId: payload.userId,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const statusEnum = this.parseOrderStatus(status);

    let order;
    try {
      order = await this.prisma.orders.update({
        where: {
          orderId: orderId,
        },
        data: {
          status: { set: statusEnum },
        },
      });
    } catch (e) {
      throw new NotFoundException('No order with this id exists');
    }

    return {
      id: orderId,
      date: order.orderDate,
      status: order.status,
      total: order.total,
    };
  }

  private parseOrderStatus(statusString: string): OrderStatus {
    switch (statusString.toLocaleLowerCase()) {
      case 'pending':
        return 'Pending';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      default:
        throw new BadRequestException(`Invalid status: ${statusString}`);
    }
  }
}
