import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  public password: string;

  @ApiProperty()
  public twoFactorCode?: string;
}
