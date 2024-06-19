import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async getJwtToken(userId: number, email: string): Promise<{ jwt: string }> {
    const payload = {
      role: userId,
      email: email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
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
        },
      });

      return this.getJwtToken(user.userId, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }
}
