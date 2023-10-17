import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SingObj } from './sing-obj';

export const GetSingObj = createParamDecorator((data: unknown, ctx: ExecutionContext): SingObj => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
