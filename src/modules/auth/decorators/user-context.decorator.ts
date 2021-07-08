import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserContextDto } from './user-context.dto';

export const UserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserContextDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
