import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { EntityPersistConfig } from '../store';

/**
 * Creates the function of the meta reducer that syncs the state with the
 * browser storage.
 * @param _initialState the initial state.
 * @param persistedKeys the state keys to persist.
 * @param feature
 */
export const persistReducer = <T>(
  _initialState: T,
  persistedKeys: EntityPersistConfig<T>,
  feature: string,
): ((reducer: ActionReducer<T>) => ActionReducer<T>) => {
  return localStorageSync({
    keys: Object.entries(persistedKeys)
      .filter(([, value]) => !!value)
      .map(([key, value]) => {
        const config = {};
        config[key] = value;
        return config;
      }) as any,
    rehydrate: true, // restore the state when opening the app
    removeOnUndefined: true, // remove from the storage when the state is undefined
    storageKeySerializer: key => `${feature} ${key}`,
    restoreDates: false, // weirdly this makes it restore dates correctly
  });
};
