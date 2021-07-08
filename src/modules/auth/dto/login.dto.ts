import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  public name: string;

  @ApiProperty()
  public password: string;

  @ApiProperty()
  public twoFactorCode?: string;
}
