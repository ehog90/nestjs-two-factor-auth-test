import { Injectable } from '@nestjs/common';
import { IUserData } from './user.interface';

@Injectable()
export class UsersService {
  // #region Properties (1)

  private mockUsers: IUserData[] = [
    { name: 'testuser', email: 'test@test.test', id: 1, password: '12345' },
  ];

  // #endregion Properties (1)

  // #region Public Methods (3)

  public getUser(name: string, password: string) {
    return this.mockUsers.filter(
      (u) => u.name === name && u.password === password,
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
