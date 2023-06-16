import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { WebOrdersState } from './web-orders.types';
import { AccountService, AccountState, getAccountState } from '../account';
import { environment } from '../../environments/environment';

@Injectable()
export class WebOrdersInterceptor implements HttpInterceptor {
  private account: AccountState = {};

  constructor(
    private store: Store<WebOrdersState>,
    private accountService: AccountService,
  ) {
    this.store
      .select(getAccountState)
      .subscribe(account => (this.account = account));
  }

  /**
   * intercept the request to add default headers and params for the
   * request
   * @param req the request
   * @param next the next handler
   * @return the http event
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(environment.api) || req.url.endsWith('/auth')) {
      return next.handle(req);
    }

    const headers: any = {};

    if (this.account.account) {
      headers['Authorization'] = `Bearer ${this.account.account.token}`;
    }

    const newRequest = req.clone({
      setHeaders: headers,
    });

    return next.handle(newRequest).pipe(
      tap({
        next: (event: HttpEvent<any>) => event,
        error: err => {
          if (!(err instanceof HttpErrorResponse)) {
            return;
          }

          if (err.status === 401 && !req.url.endsWith('/api/auth/login')) {
            this.accountService.logout();
          }
        },
      }),
    );
  }
}
