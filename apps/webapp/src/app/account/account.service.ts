import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAuthResponse } from '@web-orders/api-interfaces';
import { AccountState } from './store/account.types';
import { environment } from '../../environments/environment';
import { logout } from './store/account.actions';

/**
 * Authentication service.
 */
@Injectable({ providedIn: 'root' })
export class AccountService {
  static readonly ENDPOINT = '/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store,
  ) {}

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

  /**
   * Logs out the user.
   */
  logout() {
    const urlTree = this.router.parseUrl(this.router.url);
    delete urlTree.queryParams['callback'];
    const encoded = encodeURIComponent(urlTree.toString());
    this.store.dispatch(
      logout({
        mode: 'unauthorized',
        callback: encoded,
      }),
    );
  }
}
