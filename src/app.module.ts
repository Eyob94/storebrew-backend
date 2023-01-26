import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config/dist';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ShopifyModule } from './shopify/shopify.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
    ShopifyModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
