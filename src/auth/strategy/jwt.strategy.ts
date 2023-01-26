import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthType, JwtType } from '../types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtType): Promise<Omit<AuthType, 'password'> | null> {
    try {
      const userData = await this.prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

      const { password, ...user } = userData;

      console.log(user);

      return user;
    } catch (err) {
      return null;
    }
  }
}
