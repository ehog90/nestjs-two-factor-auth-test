import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserContextAll, UserContextPublicDto } from './user-context.dto';

export const UserContextPublic = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserContextPublicDto => {
    const request = ctx.switchToHttp().getRequest();
    const fullUserData = request.user as UserContextAll;
    return new UserContextPublicDto(
      fullUserData.id,
      fullUserData.name,
      fullUserData.email,
    );
  },
);
