export class CartErrors {
  static productIdIsNotNumber =
    'productId must be a number conforming to the specified constraints';
  static productIdIsEmpty = 'productId should not be empty';
  static quantityIsNotNumber =
    'quantity must be a number conforming to the specified constraints';
  static quantityIsEmpty = 'quantity should not be empty';
  static productNotFound = 'product not found';
  static productNotFoundInCart = 'product not found in cart';
}
