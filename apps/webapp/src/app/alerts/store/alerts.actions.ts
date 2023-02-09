import { createAction, props } from '@ngrx/store';
import { Alert, AlertPosition } from './alerts.types';

export const alertActions = {
  /**
   * Shows an alert.
   */
  showAlert: createAction('[alerts] show alert', props<{ alert: Alert }>()),

  /**
   * Closes an alert.
   */
  closeAlert: createAction('[alerts] close alert', props<{ id: string }>()),

  /**
   * Closes all alerts with a position value.
   */
  closeAlertsWithPosition: createAction(
    '[alerts] close alerts with position',
    props<{ position: AlertPosition }>(),
  ),
};
