import { createReducer, on } from '@ngrx/store';

import { EntityState, EntityStoreConfig } from './entity.types';
import { entityActions } from './entity.actions';

export const initialEntityState: <T>() => EntityState<T> = () => ({
  wizardForms: {},
});

export const entityReducer = <T extends EntityState<any>>(
  config: EntityStoreConfig<T>,
) => {
  const actions = entityActions(config.name);

  return createReducer<T>(
    config.initialState,
    on(actions.updateWizard, (state, { id, wizardState }) => {
      const wizardForms = { ...state.wizardForms };
      wizardForms[id] = wizardState;

      return {
        ...state,
        wizardForms,
      };
    }),
    on(actions.clearWizard, (state, { id }) => {
      const wizardForms = { ...state.wizardForms };
      delete wizardForms[id];

      return {
        ...state,
        wizardForms,
      };
    }),
  );
};
