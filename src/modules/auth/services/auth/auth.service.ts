import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authenticator } from 'otplib';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  // #region Constructors (1)

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public async authenticate(
    email: string,
    password: string,
    twoFactorCode?: string,
  ): Promise<any> {
    const user = this.usersService.getUser(email, password);
    if (user) {
      if (user.twoFaSecret) {
        if (!twoFactorCode) {
          throw {
            error:
              'Two-factor authentication is enabled for this user, but Code is not provided.',
            code: 2,
          };
        }
        const isTwoFactorValid = authenticator.verify({
          token: twoFactorCode,
          secret: user.twoFaSecret,
        });
        if (isTwoFactorValid) {
          const token = await this.jwtService.signAsync({ id: user.id });
          const tokenData = await this.jwtService.verifyAsync(token);
          return {
            token,
            tokenData,
          };
        } else {
          throw { error: 'Authentication Failed.', code: 1 };
        }
      } else {
        const token = await this.jwtService.signAsync({ id: user.id });
        const tokenData = await this.jwtService.verifyAsync(token);
        return {
          token,
          tokenData,
        };
      }
    }
    throw { error: 'Authentication Failed.', code: 1 };
  }

  // #endregion Public Methods (1)
}
