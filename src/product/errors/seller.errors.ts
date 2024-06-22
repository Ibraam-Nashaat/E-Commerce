export class SellerErrors {
  static nameNotString = 'name must be a string';
  static nameIsEmpty = 'name should not be empty';
  static descriptionIsEmpty = 'description should not be empty';
  static descriptionNotString = 'description must be a string';
  static priceIsNotNumber =
    'price must be a number conforming to the specified constraints';
  static priceIsEmpty = 'price should not be empty';
  static stockIsNotNumber =
    'stock must be a number conforming to the specified constraints';
  static stockIsEmpty = 'stock should not be empty';
  static categoryIsNotString = 'category must be a string';
  static categoryIsEmpty = 'category should not be empty';
  static couponIsEmpty = 'coupon should not be empty';
  static couponIsNotString = 'coupon must be a string';
  static discountIsNotNumber =
    'discount must be a number conforming to the specified constraints';
  static discountIsEmpty = 'discount should not be empty';
  static couponExists = 'Coupon already exists';
}
