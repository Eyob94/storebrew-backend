import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AuthType } from './types';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}
  async register(authDto: AuthDto): Promise<Record<string, string>> {
    const { email, password } = authDto;

    const hash = await argon.hash(password);

    try {
      const userData: AuthType = await this.prisma.user.create({
        data: {
          email,
          password: hash,
        },
      });

      const { password, ...user } = userData;

      const token = await this.signToken(user);

      console.log(token);

      return token;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002')
          throw new ForbiddenException('Credentials Taken');
      }
    }
  }

  async login(authDto: AuthDto): Promise<Record<string, string>> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: authDto.email,
      },
    });
    if (!userExists)
      throw new HttpException('Email Not found', HttpStatus.NOT_FOUND);

    const passwordMatches = await argon.verify(
      userExists.password,
      authDto.password,
    );

    if (!passwordMatches)
      throw new HttpException('Incorrect Password', HttpStatus.UNAUTHORIZED);

    const { password, ...user } = userExists;
    return this.signToken(user);
  }

  async signToken(
    authDto: Omit<AuthType, 'password'>,
  ): Promise<Record<string, string>> {
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(authDto, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
