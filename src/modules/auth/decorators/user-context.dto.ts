import { ApiProperty } from '@nestjs/swagger';

export class UserContextDto {
  // #region Properties (3)

  @ApiProperty()
  public id: number;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public twoFaSecret: string;

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(userId: number, name: string, twoFaSecret: string) {
    this.id = userId;
    this.name = name;
    this.twoFaSecret = twoFaSecret;
  }

  // #endregion Constructors (1)
}
