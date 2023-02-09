import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAuthResponse } from '@web-orders/api-interfaces';
import { Account } from './store/account.types';
import { environment } from '../../environments/environment';

/**
 * Authentication service.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  /**
   * Performs the request to authenticate the user.
   * @param username the user's username.
   * @param password the user's password.
   */
  login(username: string, password: string): Observable<Account> {
    return this.http
      .post<IAuthResponse>(`${environment.apiUrl}/auth/login`, {
        email: username,
        password,
      })
      .pipe(
        map((data: IAuthResponse) => ({
          user: {
            username: data.user.email,
            token: data.token,
          },
        }))
      );
  }
}
