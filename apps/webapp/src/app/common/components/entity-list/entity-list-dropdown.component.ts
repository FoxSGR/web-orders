import { Component, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { Entity } from '../../models/entity';
import { entityActions } from '../../store';
import { EntityConfig } from '../../types';
import { alertActions } from '../../../alerts';
import { DialogService } from '../../services';

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
  @Input() entity: T;
  @Input() entityConfig: EntityConfig<T>;
  @Input() refresh: () => void;

  constructor(
    private store: Store,
    private loadingController: LoadingController,
    private dialogService: DialogService,
  ) {}

  async delete() {
    this.dialogService.confirm(async () => {
      const loading = await this.loadingController.create();
      loading.present();

      this.entityConfig.service!.delete(this.entity.id!).subscribe({
        next: () => {
          this.store.dispatch(
            entityActions(this.entityConfig.entityType).deleted({
              entity: this.entity,
            }),
          );
          this.refresh();
        },
        error: () =>
          this.store.dispatch(
            alertActions.showAlert({
              alert: {
                type: 'error',
                message: 'str.entity.delete.alerts.error.message',
              },
            }),
          ),
        complete: () => loading.dismiss(),
      });
    }, 'str.dialogs.delete.text');
  }
}
