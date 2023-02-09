import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from './account.types';

/**
 * Selector to get the full account state.
 */
export const getAccountState = createFeatureSelector<AccountState>('account');

/**
 * Selector to get the account.
 */
export const getAccount = createSelector(
  getAccountState,
  state => state.account,
);
