import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { toFileStream } from 'qrcode';
import { UserContextWithAuthentication } from '../../decorators/user-context-with-authentication.decorator';
import {
  UserContextAll,
  UserContextPublicDto,
} from '../../decorators/user-context.dto';
import { LoginResultDto } from '../../dto/login-result.dto';
import { LoginDto } from '../../dto/login.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AuthService } from '../../services/auth/auth.service';
import { TotpService } from '../../services/totp/totp.service';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { TwoFactorSecretDto } from '../../dto/two-factor-secret.dto';
import { UserContextPublic } from '../../decorators/user-context-public';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  // #region Constructors (1)

  constructor(
    private readonly authService: AuthService,
    private readonly totpService: TotpService,
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (4)

  @Get('auth-context')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: UserContextAll })
  @ApiOperation({ summary: 'For authentication testing purposes.' })
  public getAuthContext(
    @UserContextPublic()
    userContext: UserContextPublicDto,
  ): UserContextPublicDto {
    return userContext;
  }

  @Post('login')
  @ApiResponse({ type: LoginResultDto })
  @ApiOperation({ summary: 'Endpoint for logging in.' })
  public async login(@Body() login: LoginDto): Promise<LoginResultDto> {
    try {
      const auth = await this.authService.authenticate(
        login.email,
        login.password,
        login.twoFactorCode,
      );
      return auth;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  @Get('register-2fa')
  @ApiBearerAuth()
  @ApiProduces('image/png')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      'Registering Two-Factor authentication. Next login will require TOTP Code.',
  })
  @ApiProduces('image/png')
  public registerTwoFactorAuth(
    @UserContextWithAuthentication()
    userContext: UserContextAll,
    @Res() response: Response,
  ) {
    response.setHeader('Content-Disposition', `attachment; filename="qr.png"`);
    response.setHeader('Response-Type', 'image/png');
    const qrCode =
      this.totpService.generateTwoFactorAuthenticationSecret(userContext);
    return toFileStream(response, qrCode.otpauthUrl);
  }

  @Post('validate-2fa-key')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Validate Two-Factor authentication code' })
  public validateCode(
    @UserContextWithAuthentication()
    userContext: UserContextAll,
    @Body() twoFactorDto: TwoFactorSecretDto,
  ) {
    return authenticator.verify({
      token: twoFactorDto.twoFaToken,
      secret: userContext.twoFaSecret,
    })
      ? 'Code is valid'
      : 'Code is invalid';
  }

  // #endregion Public Methods (4)
}
