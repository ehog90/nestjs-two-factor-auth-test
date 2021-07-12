import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserContextAll, UserContextPublicDto } from './user-context.dto';

export const UserContextWithAuthentication = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserContextPublicDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
