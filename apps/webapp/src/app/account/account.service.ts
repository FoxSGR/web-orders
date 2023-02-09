import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAuthResponse } from '@web-orders/api-interfaces';
import { AccountState } from './store/account.types';
import { environment } from '../../environments/environment';

/**
 * Authentication service.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  static readonly ENDPOINT = '/auth/login';

  constructor(private http: HttpClient) {}

  /**
   * Performs the request to authenticate the user.
   * @param username the user's username.
   * @param password the user's password.
   */
  login(username: string, password: string): Observable<AccountState> {
    return this.http
      .post<IAuthResponse>(`${environment.api}${AccountService.ENDPOINT}`, {
        email: username,
        password,
      })
      .pipe(
        map((data: IAuthResponse) => ({
          account: {
            username: data.user.email,
            resourcesFolder: data.user.resourcesFolder,
            token: data.token,
          },
        })),
      );
  }
}
