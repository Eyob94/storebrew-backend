import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { AuthType } from '../types';
import { AuthDto } from '../dto';

export const User = createParamDecorator(
  (data: keyof AuthType, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return data ? request?.user?.[data] : request?.user;
  },
);
