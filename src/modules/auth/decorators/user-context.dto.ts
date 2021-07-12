import { ApiProperty } from '@nestjs/swagger';

export class UserContextAll {
  // #region Properties (3)

  @ApiProperty()
  public id: number;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public twoFaSecret: string;
  @ApiProperty()
  public email: string;

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(
    userId: number,
    name: string,
    twoFaSecret: string,
    email: string,
  ) {
    this.id = userId;
    this.name = name;
    this.twoFaSecret = twoFaSecret;
    this.email = email;
  }

  // #endregion Constructors (1)
}

export class UserContextPublicDto {
  // #region Properties (3)

  @ApiProperty()
  public email: string;
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public name: string;

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(userId: number, name: string, email: string) {
    this.id = userId;
    this.name = name;
    this.email = email;
  }

  // #endregion Constructors (1)
}
