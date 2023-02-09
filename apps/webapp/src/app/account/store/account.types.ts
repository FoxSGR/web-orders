/**
 * Represents a user.
 */
export interface User {
  username: string;
  token: string;
}

/**
 * Represents an account.
 */
export interface Account {
  user?: User;
}
