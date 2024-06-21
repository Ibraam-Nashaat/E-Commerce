export class CartErrors {
  static productIdIsNotNumberError =
    'productId must be a number conforming to the specified constraints';
  static productIdIsEmptyError = 'productId should not be empty';
  static quantityIsNotNumberError =
    'quantity must be a number conforming to the specified constraints';
  static quantityIsEmptyError = 'quantity should not be empty';
  static productNotFoundError = 'product not found';
  static productNotFoundInCartError = 'product not found in cart';
}
