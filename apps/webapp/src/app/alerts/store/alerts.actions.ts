import { createAction, props } from '@ngrx/store';
import { Alert, AlertPosition } from './alerts.types';

/**
 * Shows an alert.
 */
export const showAlert = createAction(
  '[alerts] show alert',
  props<{ alert: Alert }>(),
);

/**
 * Closes an alert.
 */
export const closeAlert = createAction(
  '[alerts] close alert',
  props<{ id: string }>(),
);

/**
 * Closes all alerts with a position value.
 */
export const closeAlertsWithPosition = createAction(
  '[alerts] close alerts with position',
  props<{ position: AlertPosition }>(),
);
