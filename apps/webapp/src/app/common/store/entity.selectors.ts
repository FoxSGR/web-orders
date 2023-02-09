import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntityState } from './entity.types';
import { EntityType, OptionalId } from '../types';
import { memoize } from 'lodash';

const _entitySelectors = <T>(entity: EntityType) => {
  const get = createFeatureSelector<EntityState<T>>(entity);

  return {
    getWizard: (id: OptionalId) =>
      createSelector(get, (state: EntityState<T>) => state.wizardForms[id]),
  };
};

export const entitySelectors = memoize(_entitySelectors);
