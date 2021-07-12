import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtDto } from '../services/auth/auth.interfaces';
import { UsersService } from '../services/users/users.service';
import { UserContextAll } from '../decorators/user-context.dto';
import { config } from 'src/modules/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // #region Constructors (1)

  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtToken,
    });
  }

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public async validate(
    jwtPayload: IJwtDto,
  ): Promise<UserContextAll | boolean> {
    const userData = await this.usersService.getUserById(jwtPayload.id);
    if (!userData) {
      return false;
    }
    return new UserContextAll(
      userData.id,
      userData.name,
      userData.twoFaSecret,
      userData.email,
    );
  }

  // #endregion Public Methods (1)
}
