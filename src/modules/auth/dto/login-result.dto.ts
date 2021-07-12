import { ApiProduces, ApiProperty } from '@nestjs/swagger';

export class LoginResultDto {
  @ApiProperty()
  public token: string;

  @ApiProperty()
  public email: string;
}
