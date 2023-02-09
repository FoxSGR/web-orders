import { Component, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { lastValueFrom } from 'rxjs';

import { EntityService } from '../../services';
import { Entity } from '../../models/entity';
import { entityActions, EntityName } from '../../store';

@Component({
  template: `
    <ion-list>
      <ion-item button (click)="delete()">{{
        'str.list.actions.delete' | translate
      }}</ion-item>
    </ion-list>
  `,
})
export class EntityListDropdownComponent<T extends Entity> {
  @Input() service: EntityService<T>;
  @Input() entity: T;
  @Input() entityName: EntityName;

  constructor(
    private store: Store,
    private alertController: AlertController,
    private translate: TranslateService,
  ) {}

  async delete() {
    const alert = await this.alertController.create({
      message: await lastValueFrom(
        this.translate.get('str.dialogs.delete.text'),
      ),
      buttons: [
        {
          text: await lastValueFrom(
            this.translate.get('str.dialogs.delete.cancel'),
          ),
        },
        {
          text: await lastValueFrom(
            this.translate.get('str.dialogs.delete.confirm'),
          ),
          id: 'confirm-button',
          handler: () =>
            this.store.dispatch(
              entityActions(this.entityName).delete({ entity: this.entity }),
            ),
        },
      ],
    });

    alert.present();
  }
}
