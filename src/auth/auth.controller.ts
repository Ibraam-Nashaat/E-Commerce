import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/signUpRequest.dto';
import { SignInRequestDto } from './dto/signInRequest.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthErrors } from './errors/auth.errors';
import { AuthResponseDto } from './dto/authResponse.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: AuthResponseDto,
  })
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
  @ApiConflictResponse({
    description: [AuthErrors.emailExists, AuthErrors.phoneNumberExists].join(
      '<br>',
    ),
  })
  @Post('signup')
  signUp(@Body() userData: SignUpRequestDto) {
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
    description: 'Signed in successfully',
    type: AuthResponseDto,
  })
  @Post('signin')
  signIn(@Body() userData: SignInRequestDto) {
    return this.authService.signin(userData);
  }
}
