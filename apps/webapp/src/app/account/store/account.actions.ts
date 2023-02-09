import { createAction, props } from '@ngrx/store';
import { Account } from './account.types';

/**
 * Requests login to be made.
 */
export const login = createAction(
  '[account] login',
  props<{
    username: string;
    password: string;
    onSuccess?: () => void;
    onError?: (error: any) => void;
    targetRoute?: string;
  }>(),
);

/**
 * Informs that the login was successful.
 */
export const loginSuccess = createAction(
  '[account] login success',
  props<{ account: Account }>(),
);

/**
 * Informs that the login was unsuccessful.
 */
export const loginFailed = createAction(
  '[account] login failed',
  props<{ error: any }>(),
);

/**
 * Requests a logout.
 */
export const logout = createAction(
  '[account] logout',
  props<{ mode: 'manual' | 'unauthorized'; callback?: string }>(),
);
