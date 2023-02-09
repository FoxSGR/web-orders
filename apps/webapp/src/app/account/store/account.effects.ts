import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import * as fromAccountActions from './account.actions';

import { safeCall } from '../../common/util/safe-call';
import { AccountService } from '../account.service';
import { AlertService } from '../../common';

// noinspection JSUnusedGlobalSymbols
/**
 * Account related effects.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountEffects {
  /**
   * Request login to be made
   */
  login$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromAccountActions.login),
      switchMap(action =>
        this.authService.login(action.username, action.password).pipe(
          map(account => {
            safeCall(action.onSuccess);

            if ('targetRoute' in action) {
              this.router.navigate([action.targetRoute]);
            }

            return fromAccountActions.loginSuccess({ account });
          }),
          catchError(error => {
            safeCall(action.onError, error.error);
            return [fromAccountActions.loginFailed({ error })];
          }),
        ),
      ),
    ),
  );

  /**
   * After a failed login
   */
  loginFailed$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromAccountActions.loginFailed),
        tap(action =>
          this.alertService.showAlert({
            message: action.error.error.statusCode
              ? action.error.error.message
              : this.translate.instant('str.account.login.error'),
            type: 'error',
          }),
        ),
      ),
    { dispatch: false },
  );

  /**
   * After logging out
   */
  logout$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromAccountActions.logout),
        tap(({ callback, mode }) => {
          if (mode === 'manual') {
            this.alertService.showAlert({
              type: 'success',
              message: this.translate.instant('str.account.loggedOut'),
            });
          }

          this.router.navigate(['login', { callback }]);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions: Actions,
    private router: Router,
    private translate: TranslateService,
    private authService: AccountService,
    private alertService: AlertService,
  ) {}
}
