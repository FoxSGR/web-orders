import { EntityName, EntityState } from './entity.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const entitySelectors = <T>(entity: EntityName) => {
  const get = createFeatureSelector<EntityState<T>>(entity);

  return {
    getPage: createSelector(get, (state: EntityState<T>) => state.page),
    getFilter: createSelector(get, (state: EntityState<T>) => state.filter),
    getStatus: createSelector(get, (state: EntityState<T>) => state.status),
  };
};
