export class AuthErrors {
  static nameIsNotString = 'name must be a string';
  static nameIsEmpty = 'name should not be empty';
  static emailIsEmpty = 'email should not be empty';
  static emailMustFollowEmailFormat = 'email must be an email';
  static passwordIsNotString = 'password must be a string';
  static passwordIsEmpty = 'password should not be empty';
  static phoneMustBeValid = 'phone must be a valid phone number';
  static phoneIsEmpty = 'phone should not be empty';
  static addressIsEmpty = 'address should not be empty';
  static emailExists = 'email already exists';
  static phoneNumberExists = 'phone number already exists';
  static emailNotFound = 'email not found';
  static passwordIsIncorrect = 'password is incorrect';
}
