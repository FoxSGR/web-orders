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
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { WebOrdersState } from './web-orders.types';
import { Account, getAccount, logout } from '../account';
import { environment } from '../../environments/environment';

@Injectable()
export class WebOrdersInterceptor implements HttpInterceptor {
  private account: Account = {};

  constructor(private router: Router, private store: Store<WebOrdersState>) {
    this.store
      .select(getAccount)
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
    if (!req.url.startsWith(environment.apiUrl) || req.url.endsWith('/auth')) {
      return next.handle(req);
    }

    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (this.account.user) {
      headers['Authorization'] = `Bearer ${this.account.user.token}`;
    }

    const newRequest = req.clone({
      setHeaders: headers,
    });

    return next.handle(newRequest).pipe(
      tap(
        (event: HttpEvent<any>) => {
          return event;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 401: {
                const urlTree = this.router.parseUrl(this.router.url);
                delete urlTree.queryParams['callback'];
                const encoded = encodeURIComponent(urlTree.toString());

                if (!req.url.endsWith('/api/auth/login')) {
                  this.store.dispatch(
                    logout({
                      mode: 'unauthorized',
                      callback: encoded,
                    }),
                  );
                }

                break;
              }
            }
          }
        },
      ),
    );
  }
}
