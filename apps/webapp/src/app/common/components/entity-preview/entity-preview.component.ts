import { Component, Injector, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import type { Entity } from '../../models/entity';
import { EntityConfig, EntityType } from '../../types';
import { EntityPreviewConfig } from './entity-preview.types';
import { EntityConfigRegister } from '../../entity-config.register';
import { AbstractModalComponent } from '../abstract-modal/abstract-modal.component';
import { alertActions } from '../../../alerts';

@Component({
  selector: 'wo-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss'],
})
export class EntityPreviewComponent<T extends Entity>
  extends AbstractModalComponent
  implements OnInit
{
  @Input() entity: T;
  @Input() entityId?: T;
  @Input() entityType: EntityType;

  previewData!: EntityPreviewConfig;

  constructor(
    protected translate: TranslateService,
    protected loadingController: LoadingController,
    protected store: Store,
    protected injector: Injector,
  ) {
    super();
  }

  override async ngOnInit() {
    super.ngOnInit();

    const entityConfig = EntityConfigRegister.getDefinition<T>(this.entityType);
    if (this.entityId && !this.entity) {
      await this.loadEntity(entityConfig);
    }

    this.previewData = entityConfig.previewConfig!(this.entity);
  }

  edit() {
    // this.config.edit(this.entity);
    this.close();
  }

  private async loadEntity(config: EntityConfig<T>) {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      config.service = this.injector.get(config.serviceClass);
      this.entity = await firstValueFrom(
        config.service!.findById(this.entityId!),
      );
    } catch (e) {
      console.error(e);
      this.store.dispatch(
        alertActions.showAlert({
          alert: {
            type: 'error',
            message: 'str.entity.preview.alerts.error.message',
          },
        }),
      );
      return;
    } finally {
      await loading.dismiss();
    }
  }
}
