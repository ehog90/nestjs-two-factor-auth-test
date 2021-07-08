import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthController } from './controllers/auth/auth.controller';
import { TotpService } from './services/totp/totp.service';
import { config } from '../configuration';
@Module({
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    UsersService,
    TotpService,
  ],
  exports: [PassportModule, JwtModule, AuthService, JwtStrategy, JwtAuthGuard],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwtToken,
      signOptions: {
        expiresIn: '1w',
        algorithm: 'HS512',
      },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
