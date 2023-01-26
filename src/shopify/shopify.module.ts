import { Module } from '@nestjs/common';
import { ShopifyAuthModule } from './auth/shopifyAuth.module';

@Module({
  imports: [ShopifyAuthModule],

  exports: [ShopifyModule],
})
export class ShopifyModule {}
