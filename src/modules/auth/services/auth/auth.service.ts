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
    name: string,
    password: string,
    twoFactorCode?: string,
  ): Promise<any> {
    const user = this.usersService.getUser(name, password);
    if (user) {
      if (user.twoFaSecret) {
        if (!twoFactorCode) {
          throw 'Two-factor authentication is enabled for this user, but Code is not provided.';
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
          throw 'Authentication Failed.';
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
    throw 'Authentication Failed.';
  }

  // #endregion Public Methods (1)
}
