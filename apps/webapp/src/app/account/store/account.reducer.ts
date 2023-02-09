import { createReducer, on } from '@ngrx/store';
import * as AccountActions from './account.actions';
import { AccountState } from './account.types';

/**
 * The initial state of the account.
 */
export const initialAccountState: AccountState = { account: undefined };

/**
 * The reducer for the account actions.
 */
export const accountReducer = createReducer<AccountState>(
  initialAccountState,
  on(AccountActions.login, _ => ({ account: undefined })),
  on(AccountActions.loginSuccess, (state, { account }) => account),
  on(AccountActions.logout, _ => ({ account: undefined })),
);
