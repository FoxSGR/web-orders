import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';

import { alertActions } from './alerts.actions';
import { AlertType } from './alerts.types';

const icons: { [key in AlertType]: string } = {
  success: 'checkmark',
  info: 'information',
  error: 'close',
  warning: 'alert',
};

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
        ofType(alertActions.showAlert),
        tap(async action => {
          const position = action.alert.position || 'toast';
          const timeout = action.alert.timeout || 60;

          if (position === 'toast') {
            const toast = await this.toastController.create({
              message: await firstValueFrom(
                this.translate.get(
                  action.alert.message,
                  action.alert.messageParams,
                ),
              ),
              duration: timeout * 1000,
              animated: true,
              icon: icons[action.alert.type],
              buttons: [
                ...(action.alert.buttons || []).map(button => ({
                  text: button.text,
                  icon: button.icon,
                  handler: button.callback,
                })),
                {
                  side: 'end',
                  icon: 'close',
                  handler: () => toast.dismiss(),
                },
              ],
            });

            await toast.present();
          }
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions: Actions,
    private translate: TranslateService,
    private toastController: ToastController,
  ) {}
}
