import { EntityType, SmartFormState } from '../types';
import { Keys } from 'ngrx-store-localstorage';

/**
 * State definition for an entity type.
 */
export interface EntityState<T> {
  wizardForms: { [id: string]: SmartFormState };
}

/**
 * Configuration for an entity type store.
 */
export interface EntityStoreConfig<T> {
  name: EntityType;
  initialState: T;
}

/**
 * Entity state persistence configuration.
 */
export type EntityPersistConfig<T> = {
  [P in keyof Required<T>]: boolean | Keys[number];
};

/**
 * Default entity state persistence configuration.
 */
export const entityPersistConfig: EntityPersistConfig<EntityState<any>> = {
  wizardForms: {
    serialize: state => {
      const result = {};
      if ('_' in state) {
        result['_'] = state['_'];
      }

      return result;
    },
  },
};
