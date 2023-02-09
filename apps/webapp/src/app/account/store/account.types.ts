/**
 * Represents account data.
 */
export interface Account {
  username: string;
  token: string;
  resourcesFolder: string;
}

/**
 * Represents account state.
 */
export interface AccountState {
  account?: Account;
}
