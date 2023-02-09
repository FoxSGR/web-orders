import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { Entity } from '../../models/entity';
import { entityActions } from '../../store';
import { EntityConfig } from '../../types';
import {
  AlertService,
  DialogService,
  EntityHelperService,
  EntityPrintService,
} from '../../services';
import { WOActionItem } from '../../wo-common.types';

@Component({
  template: `
    <ion-list>
      <ion-item
        button
        *ngFor="let action of actions"
        (click)="action.action()"
        lines="full"
      >
        <ion-icon
          [name]="action.icon"
          slot="start"
          style="margin-inline-end: 16px;"
        ></ion-icon>
        <ion-label>{{ action.label | translate }}</ion-label>
      </ion-item>
    </ion-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityListDropdownComponent<T extends Entity> {
  @Input() entity: T;
  @Input() entityConfig: EntityConfig<T>;
  @Input() refresh: () => void;

  actions: WOActionItem[] = [
    {
      label: 'str.list.actions.print',
      icon: 'print',
      action: () => this.print(),
    },
    {
      label: 'str.list.actions.delete',
      icon: 'trash',
      action: () => this.delete(),
    },
  ];

  constructor(
    private store: Store,
    private loadingController: LoadingController,
    private dialogService: DialogService,
    private entityPrintService: EntityPrintService,
    private entityHelperService: EntityHelperService,
    private alertService: AlertService,
  ) {}

  delete() {
    this.dialogService.confirm(async () => {
      const loading = await this.loadingController.create();
      loading.present();

      this.entityConfig.service!.delete(this.entity.id!).subscribe({
        next: () => {
          this.alertService.showAlert({
            type: 'success',
            message: 'str.entity.delete.alerts.success.message',
          });
          this.refresh();
        },
        error: () =>
          this.alertService.showAlert({
            type: 'error',
            message: 'str.entity.delete.alerts.error.message',
          }),
        complete: () => loading.dismiss(),
      });
    }, 'str.dialogs.delete.text');
  }

  async print() {
    const entity = await this.entityHelperService.findEntity(
      this.entity.id!,
      this.entityConfig.entityType,
    );

    this.entityPrintService.printEntity(entity, this.entityConfig.entityType);
  }
}
