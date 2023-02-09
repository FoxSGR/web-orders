import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Account } from './account.types';

/**
 * Selector to get the full account state.
 */
export const getAccount = createFeatureSelector<Account>('account');

/**
 * Selector to get the user.
 */
export const getUser = createSelector(getAccount, state => state.user);
