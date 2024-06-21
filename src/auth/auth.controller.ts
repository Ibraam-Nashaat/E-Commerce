import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() userData: SignUpDto) {
    return this.authService.signup(userData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() userData: SignInDto) 
  {
    return this.authService.signin(userData);
  }
}
