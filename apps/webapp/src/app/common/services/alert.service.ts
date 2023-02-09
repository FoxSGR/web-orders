import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import { Alert, AlertType } from '../types/alert.types';

/**
 * Service to display alerts.
 */
@Injectable({ providedIn: 'root' })
export class AlertService {
  /**
   * Icons to use for each alert type.
   * @private
   */
  private static readonly ICONS: { [key in AlertType]: string } = {
    success: 'checkmark',
    info: 'information',
    error: 'close',
    warning: 'alert',
  };

  constructor(
    private toastController: ToastController,
    private translate: TranslateService,
  ) {}

  /**
   * Displays an alert.
   * @param alert Alert to display.
   */
  async showAlert(alert: Alert): Promise<void> {
    const timeout = alert.timeout || 60;

    const toast = await this.toastController.create({
      message: await firstValueFrom(
        this.translate.get(alert.message, alert.messageParams),
      ),
      duration: timeout * 1000,
      animated: true,
      icon: AlertService.ICONS[alert.type],
      buttons: [
        ...(alert.buttons || []).map(button => ({
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

    setTimeout(() => toast.dismiss(), timeout * 1000);
    await toast.present();
  }
}
