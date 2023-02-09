import { createReducer, on } from '@ngrx/store';

import { EntityState, EntityStoreConfig } from './entity.types';
import { entityActions } from './entity.actions';

export const initialEntityState: <T>() => EntityState<T> = () => ({
  loaded: [],
});

export const entityReducer = <T>(config: EntityStoreConfig<T>) => {
  const actions = entityActions(config.name);

  return createReducer<T>(
    config.initialState,
    on(actions.pageLoaded, (state, { page }) => ({ ...(state as any), page })),
  );
};
