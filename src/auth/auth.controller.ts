import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
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

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBadRequestResponse({
    description: [
      'name must be a string',
      'name should not be empty',
      'email should not be empty',
      'email must be an email',
      'password must be a string',
      'password should not be empty',
      'phone must be a valid phone number',
      'phone should not be empty',
      'address should not be empty',
    ].join('<br>'),
  })
  @ApiCreatedResponse({
    description: 'signed up successfully',
  })
  @ApiConflictResponse({
    description: ['email already exists', 'phone number already exists'].join(
      '<br>',
    ),
  })
  @Post('signup')
  signUp(@Body() userData: SignUpDto) {
    return this.authService.signup(userData);
  }

  @ApiBadRequestResponse({
    description: [
      'email should not be empty',
      'email must be an email',
      'password must be a string',
      'password should not be empty',
    ].join('<br>'),
  })
  @ApiNotFoundResponse({
    description: 'email not found',
  })
  @ApiUnauthorizedResponse({
    description: 'password is incorrect',
  })
  @ApiCreatedResponse({
    description: 'signed in successfully',
  })
  @Post('signin')
  signIn(@Body() userData: SignInDto) {
    return this.authService.signin(userData);
  }
}
