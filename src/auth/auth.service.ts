import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/signin.dto';
import { AuthErrors } from './errors/auth.errors';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async getJwtToken(userId: number, email: string): Promise<{ jwt: string }> {
    const payload = {
      id: userId,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });

    return {
      jwt: token,
    };
  }

  async signup(userData: SignUpDto) {
    const hashedPassword = await argon.hash(userData.password);
    try {
      const user = await this.prisma.users.create({
        data: {
          email: userData.email,
          name: userData.name,
          hashedPassword: hashedPassword,
          address: userData.address,
          phone: userData.phone,
        },
      });

      await this.prisma.carts.create({
        data: {
          userId: user.userId,
        },
      });

      return this.getJwtToken(user.userId, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta?.target) {
          const target = error.meta.target as string[];

          if (target.includes('email')) {
            throw new ConflictException(AuthErrors.emailExists);
          }
          if (target.includes('phone')) {
            throw new ConflictException(AuthErrors.phoneNumberExists);
          }
        }
      }
      throw error;
    }
  }

  async signin(userData: SignInDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!user) throw new NotFoundException(AuthErrors.emailNotFound);

    const pwMatches = await argon.verify(
      user.hashedPassword,
      userData.password,
    );

    if (!pwMatches)
      throw new UnauthorizedException(AuthErrors.passwordIsIncorrect);
    return this.getJwtToken(user.userId, user.email);
  }
}
