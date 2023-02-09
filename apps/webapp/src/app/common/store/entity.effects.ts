import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { EntityService } from '../services';
import { entityActions } from './entity.actions';
import { entitySelectors } from './entity.selectors';
import { EntityName } from './entity.types';
import { Entity } from '../models/entity';

export class EntityEffects<T extends Entity> {
  private entityActions = entityActions<T>(this.entityName);
  private entitySelectors = entitySelectors(this.entityName);

  loadPage$ = createEffect(() =>
    this.actions.pipe(
      ofType(this.entityActions.loadPage),
      switchMap(action =>
        this.service.findPage(action.params).pipe(
          map(page =>
            this.entityActions.pageLoaded({
              page,
            }),
          ),
        ),
      ),
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
    private store: Store,
    private actions: Actions,
    private service: EntityService<T>,
    private entityName: EntityName,
  ) {}
}
