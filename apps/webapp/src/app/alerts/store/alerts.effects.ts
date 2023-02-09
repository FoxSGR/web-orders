import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromAlertsActions from './alerts.actions';
import { tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

// noinspection JSUnusedGlobalSymbols
/**
 * Alert related effects.
 */
@Injectable({
  providedIn: 'root',
})
export class AlertsEffects {
  showAlert$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromAlertsActions.showAlert),
        tap(async (action) => {
          const position = action.alert.position || 'toast';
          const timeout = action.alert.timeout || 5;

          if (position === 'toast') {
            const toast = await this.toastController.create({
              message: action.alert.message,
              duration: timeout * 1000,
            });

            await toast.present();
          }
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions: Actions,
    private toastController: ToastController,
  ) {}
}
