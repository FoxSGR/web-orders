import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { KeyMap } from '../wo-common.types';

/**
 * Creates the function of the meta reducer that syncs the state with the
 * browser storage.
 * @param initialState the initial state.
 * @param persistedKeys the state keys to persist.
 */
export const persistReducer = <T>(
  initialState: T,
  persistedKeys: KeyMap<T>,
): ((reducer: ActionReducer<T>) => ActionReducer<T>) => (reducer) =>
  localStorageSync({
    keys: Object.keys(persistedKeys),
    rehydrate: true, // restore the state when opening the app
    removeOnUndefined: true, // remove from the storage when the state is undefined
  })(reducer);
