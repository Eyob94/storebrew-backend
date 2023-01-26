import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { ShopifyAuthService } from './shopifyAuth.service';
import { Request, Response } from '../decorators';
import { Request as RequestType, Response as ResponseType } from 'express';

@Controller('shopify')
export class ShopifyAuthController {
  constructor(private shopifyAuthService: ShopifyAuthService) {}

  @Get('auth')
  async authenticate(
    @Request() req: RequestType,
    @Response() res: ResponseType,
  ) {
    return await this.shopifyAuthService.begin(req, res);
  }

  @Get('auth/callback')
  callback(@Request() req: RequestType, @Response() res: ResponseType) {
    return this.shopifyAuthService.callback(req, res);
  }
}
