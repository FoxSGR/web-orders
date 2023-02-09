import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EntityService } from '../services';
import { entityActions } from './entity.actions';
import { EntityName } from './entity.types';
import { map, switchMap } from 'rxjs/operators';

export class EntityEffects<T> {
  private entityActions = entityActions(this.entityName);

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

  constructor(
    private actions: Actions,
    private service: EntityService<T>,
    private entityName: EntityName,
  ) {}
}
