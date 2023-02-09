import { AlertsState } from '../alerts';
import { AccountState } from '../account';

export interface WebOrdersState {
  account: AccountState;
  alerts: AlertsState;
}
