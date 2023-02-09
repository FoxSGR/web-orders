import { createReducer, on } from '@ngrx/store';

import { EntityState, EntityStoreConfig } from './entity.types';
import { entityActions } from './entity.actions';

export const initialEntityState: <T>() => EntityState<T> = () => ({
  loaded: [],
  filter: {},
  status: 'unloaded',
});

export const entityReducer = <T extends EntityState<any>>(
  config: EntityStoreConfig<T>,
) => {
  const actions = entityActions(config.name);

  return createReducer<T>(
    config.initialState,
    on(actions.loadPage, state => ({ ...state, status: 'loading' })),
    on(actions.pageLoaded, (state, { page }) => ({
      ...state,
      page,
      status: 'loaded',
    })),
    on(actions.pageLoadError, state => ({
      ...state,
      page: { ...state.page, items: [] },
      status: 'error',
    })),
  );
};
