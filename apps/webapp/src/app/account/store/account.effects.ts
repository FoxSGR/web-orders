import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import * as fromAccountActions from './account.actions';
import * as fromAlertsActions from '../../alerts/store/alerts.actions';

import { safeCall } from '../../common/util/safe-call';
import { AccountService } from '../account.service';

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
      switchMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((account) => {
            safeCall(action.onSuccess);

            if ('targetRoute' in action) {
              this.router.navigate([action.targetRoute]);
            }

            return fromAccountActions.loginSuccess({ account });
          }),
          catchError((error) => {
            safeCall(action.onError, error.error);
            return [fromAccountActions.loginFailed({ error })];
          }),
        ),
      ),
    ),
  );

  /**
   * After a successful login.
   */
  // loginSuccess$ = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(fromAccountActions.loginSuccess),
  //     map(() =>
  //       fromAlertsActions.showAlert({
  //         alert: {
  //           type: 'success',
  //           message: this.translate.instant('str.account.login.success'),
  //         },
  //       }),
  //     ),
  //   ),
  // );

  /**
   * After a failed login
   */
  loginFailed$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromAccountActions.loginFailed),
      map((action) =>
        fromAlertsActions.showAlert({
          alert: {
            message: action.error.error.statusCode
              ? action.error.error.message
              : this.translate.instant('str.account.login.error'),
            type: 'danger',
          },
        }),
      ),
    ),
  );

  /**
   * After logging out
   */
  logout$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromAccountActions.logout),
      map(() => {
        this.router.navigate(['']);
        return fromAlertsActions.showAlert({
          alert: {
            type: 'success',
            message: this.translate.instant('str.account.loggedOut'),
          },
        });
      }),
    ),
  );

  constructor(
    private actions: Actions,
    private authService: AccountService,
    private router: Router,
    private translate: TranslateService,
  ) {}
}
