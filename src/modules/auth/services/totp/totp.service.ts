import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { config } from 'src/modules/configuration';
import { UserContextAll } from '../../decorators/user-context.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TotpService {
  // #region Constructors (1)

  constructor(private readonly usersService: UsersService) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public generateTwoFactorAuthenticationSecret(user: UserContextAll) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      user.id.toString(),
      config.appName,
      secret,
    );
    this.usersService.setTwoFaSecret(secret, user.id);
    return {
      secret,
      otpauthUrl,
    };
  }

  // #endregion Public Methods (1)
}
