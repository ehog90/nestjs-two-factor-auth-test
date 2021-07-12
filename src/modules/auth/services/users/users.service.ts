import { Injectable } from '@nestjs/common';
import { IUserData } from './user.interface';

@Injectable()
export class UsersService {
  // #region Properties (1)

  private mockUsers: IUserData[] = [
    {
      name: 'testuser',
      email: 'test@test.test',
      id: 420,
      password: '12345',
      twoFaSecret: 'NBKVILYNBRLWMOS2',
    },
    {
      name: 'testuser_noauth',
      email: 'test2@test.test',
      id: 840,
      password: '12345',
    },
  ];

  // #endregion Properties (1)

  // #region Public Methods (3)

  public getUser(email: string, password: string) {
    return this.mockUsers.filter(
      (u) => u.email === email?.toLowerCase() && u.password === password,
    )?.[0];
  }

  public getUserById(id: number) {
    return this.mockUsers.filter((u) => u.id === id)?.[0];
  }

  public setTwoFaSecret(secret: string, id: number) {
    const user = this.mockUsers.filter((u) => u.id === id)?.[0];
    if (user) {
      user.twoFaSecret = secret;
    }
  }

  // #endregion Public Methods (3)
}
