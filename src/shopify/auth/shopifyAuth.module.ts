import { Module } from '@nestjs/common';
import { ShopifyAuthController } from './shopifyAuth.controller';
import { ShopifyAuthService } from './shopifyAuth.service';

@Module({
  controllers: [ShopifyAuthController],
  imports: [],
  providers: [ShopifyAuthService],
  exports: [ShopifyAuthModule],
})
export class ShopifyAuthModule {}
