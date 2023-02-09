import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { EntityService } from '../services';
import { entityActions } from './entity.actions';
import { entitySelectors } from './entity.selectors';
import { EntityName } from './entity.types';
import { Entity } from '../models/entity';
import { alertActions } from '../../alerts';
import { Injector } from '@angular/core';

// noinspection JSUnusedGlobalSymbols
export class EntityEffects<T extends Entity> {
  protected entityActions = entityActions<T>(this.entityName);
  private entitySelectors = entitySelectors(this.entityName);

  loadPage$ = createEffect(() =>
    this.actions.pipe(
      ofType(this.entityActions.loadPage),
      switchMap(action =>
        this.service.findPage({ ...action.params }).pipe(
          map(page =>
            this.entityActions.pageLoaded({
              page,
            }),
          ),
          catchError(error => of(this.entityActions.pageLoadError(error))),
        ),
      ),
    ),
  );

  pageLoadError$ = createEffect(() =>
    this.actions.pipe(
      ofType(this.entityActions.pageLoadError),
      switchMap(error => {
        console.error(error)
        return [
          alertActions.showAlert({
            alert: {
              message: 'str.list.errors.loading.message',
              type: 'error',
            },
          }),
        ];
      }),
    ),
  );

  reloadPage$ = createEffect(() =>
    this.actions.pipe(
      ofType(this.entityActions.reloadPage),
      withLatestFrom(this.store.select(this.entitySelectors.getFilter)),
      map(([, filter]) => this.entityActions.loadPage({ params: filter })),
    ),
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(this.entityActions.delete),
      switchMap(({ entity }) => this.service.delete(entity.id!)),
      map(() => this.entityActions.reloadPage()),
    ),
  );

  constructor(
    protected store: Store,
    protected actions: Actions,
    protected service: EntityService<T>,
    private entityName: EntityName,
  ) {}
}
