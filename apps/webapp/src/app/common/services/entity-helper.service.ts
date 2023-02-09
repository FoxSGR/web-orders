import { Injectable, Injector } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { Id } from '@web-orders/api-interfaces';
import { alertActions } from '../../alerts';
import { EntityType } from '../types';
import { EntityConfigRegister } from '../entity-config.register';
import { Entity } from '../models/entity';
import { EntityService } from './entity.service';

@Injectable({ providedIn: 'root' })
export class EntityHelperService {
  constructor(
    private loadingController: LoadingController,
    private injector: Injector,
    private store: Store,
  ) {}

  async findEntity<T extends Entity>(
    id: Id,
    entityType: EntityType,
  ): Promise<T> {
    const loading = await this.loadingController.create();
    await loading.present();

    const config = EntityConfigRegister.getDefinition(entityType);

    try {
      config.service = this.injector.get<EntityService<T>>(config.serviceClass);
      return (await firstValueFrom(config.service!.findById(id))) as T;
    } catch (e) {
      this.store.dispatch(
        alertActions.showAlert({
          alert: {
            type: 'error',
            message: 'str.entity.preview.alerts.error.message',
          },
        }),
      );
      throw e;
    } finally {
      await loading.dismiss();
    }
  }
}
