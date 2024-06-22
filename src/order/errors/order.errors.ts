export class OrderErrors {
  static couponNotFound = 'coupon not found';
  static orderIdNotFound = 'no order exists with this id';
  static emptyCart=  "can't create order from empty cart"
  static cartItemsExceedStock = 'one or more items exceed available stock.'
  static invalidOrderStatus = 'invalid order status'
}
