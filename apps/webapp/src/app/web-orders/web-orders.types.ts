import { AlertsState } from '../alerts';
import { Account } from '../account';

export interface WebOrdersState {
  account: Account;
  alerts: AlertsState;
}
