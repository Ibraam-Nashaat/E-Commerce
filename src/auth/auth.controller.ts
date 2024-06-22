import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthErrors } from './errors/auth.errors';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBadRequestResponse({
    description: [
      AuthErrors.nameIsNotString,
      AuthErrors.nameIsEmpty,
      AuthErrors.emailIsEmpty,
      AuthErrors.emailMustFollowEmailFormat,
      AuthErrors.passwordIsNotString,
      AuthErrors.passwordIsEmpty,
      AuthErrors.phoneMustBeValid,
      AuthErrors.phoneIsEmpty,
      AuthErrors.addressIsEmpty,
    ].join('<br>'),
  })
  @ApiCreatedResponse({
    description: 'signed up successfully',
  })
  @ApiConflictResponse({
    description: [AuthErrors.emailExists, AuthErrors.phoneNumberExists].join(
      '<br>',
    ),
  })
  @Post('signup')
  signUp(@Body() userData: SignUpDto) {
    return this.authService.signup(userData);
  }

  @ApiBadRequestResponse({
    description: [
      AuthErrors.emailIsEmpty,
      AuthErrors.emailMustFollowEmailFormat,
      AuthErrors.passwordIsNotString,
      AuthErrors.passwordIsEmpty,
    ].join('<br>'),
  })
  @ApiNotFoundResponse({
    description: AuthErrors.emailNotFound,
  })
  @ApiUnauthorizedResponse({
    description: AuthErrors.passwordIsIncorrect,
  })
  @ApiCreatedResponse({
    description: 'signed in successfully',
  })
  @Post('signin')
  signIn(@Body() userData: SignInDto) {
    return this.authService.signin(userData);
  }
}
