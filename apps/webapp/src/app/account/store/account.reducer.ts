import { createReducer, on } from '@ngrx/store';
import * as AccountActions from './account.actions';
import { Account } from './account.types';

/**
 * The initial state of the account.
 */
export const initialAccountState: Account = { user: undefined };

/**
 * The reducer for the account actions.
 */
export const accountReducer = createReducer<Account>(
  initialAccountState,
  on(AccountActions.login, _ => ({ user: undefined })),
  on(AccountActions.loginSuccess, (state, { account }) => account),
  on(AccountActions.logout, _ => ({ user: undefined })),
);
