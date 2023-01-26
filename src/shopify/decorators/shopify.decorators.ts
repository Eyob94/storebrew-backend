import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Request = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request;
  },
);

export const Response = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();
    return response;
  },
);
