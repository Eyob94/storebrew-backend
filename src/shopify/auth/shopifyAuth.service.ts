import '@shopify/shopify-api/adapters/node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiVersion,
  LATEST_API_VERSION,
  shopifyApi,
} from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-01';
import { Request, Response } from 'express';

@Injectable()
export class ShopifyAuthService {
  constructor(private config: ConfigService) {}

  private shopify = shopifyApi({
    apiKey: this.config.get('SHOPIFY_API_KEY'),
    apiSecretKey: this.config.get('SHOPIFY_SECRET_KEY'),
    scopes: ['read_products'],
    hostName: '76fe-196-189-55-66.eu.ngrok.io',
    isEmbeddedApp: false,
    restResources,
    apiVersion: LATEST_API_VERSION,
  });

  async begin(req: Request, res: Response): Promise<void> {
    const beg = await this.shopify.auth.begin({
      shop: this.shopify.utils.sanitizeShop(req.query.shop as string, true),
      callbackPath: '/shopify/auth/callback',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });

    console.log('hello');
    console.log(req);
  }

  async callback(req: Request, res: Response) {
    const response = await this.shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });
  }
}
