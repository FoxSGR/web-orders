import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(
    private alertController: AlertController,
    private translate: TranslateService,
  ) {}

  async confirm(callback: () => void, message = 'str.dialogs.common.text') {
    const alert = await this.alertController.create({
      message: await lastValueFrom(this.translate.get(message)),
      buttons: [
        {
          text: await lastValueFrom(
            this.translate.get('str.dialogs.common.cancel'),
          ),
        },
        {
          text: await lastValueFrom(
            this.translate.get('str.dialogs.common.confirm'),
          ),
          id: 'confirm-button',
          handler: () => callback(),
        },
      ],
    });

    alert.present();
  }
}
