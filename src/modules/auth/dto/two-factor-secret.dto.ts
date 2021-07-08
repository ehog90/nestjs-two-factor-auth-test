import { ApiProperty } from '@nestjs/swagger';

export class TwoFactorSecretDto {
  @ApiProperty()
  public twoFaToken: string;
}
