import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import { entityActions } from './entity.actions';
import { entitySelectors } from './entity.selectors';
import { Entity } from '../models/entity';
import { EntityType } from '../types';
import { EntityConfigRegister } from '../entity-config.register';
import { EntityService } from '../services';

// noinspection JSUnusedGlobalSymbols
export class EntityEffects<T extends Entity> {
  protected entityActions = entityActions<T>(this.entityType);
  protected entitySelectors = entitySelectors<T>(this.entityType);
  protected entityConfig = EntityConfigRegister.getDefinition(this.entityType);
  protected entityService = this.injector.get<EntityService<T>>(
    this.entityConfig.serviceClass,
  );

  protected router = this.injector.get(Router);
  protected store = this.injector.get(Store);
  protected actions = this.injector.get(Actions);

  constructor(protected injector: Injector, protected entityType: EntityType) {}
}
