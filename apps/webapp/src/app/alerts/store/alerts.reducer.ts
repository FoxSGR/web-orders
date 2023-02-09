import { createReducer, on } from '@ngrx/store';
import * as uuid from 'uuid';

import { AlertsState } from './alerts.types';
import { alertActions } from './alerts.actions';

/**
 * The initial alerts state.
 */
export const initialAlertsState: AlertsState = {
  collection: [],
};

/**
 * The reducer for alert actions.
 */
export const alertsReducer = createReducer<AlertsState>(
  initialAlertsState,
  on(alertActions.showAlert, (state, { alert }) => ({
    ...state,
    collection: [
      ...state.collection,
      {
        ...alert,
        id: uuid.v4(),
        timeout: alert.timeout || 5,
      },
    ],
  })),
  on(alertActions.closeAlert, (state, { id }) => ({
    ...state,
    collection: state.collection.filter(alert => alert.id !== id),
  })),
  on(alertActions.closeAlertsWithPosition, (state, { position }) => ({
    ...state,
    collection: state.collection.filter(alert => alert.position !== position),
  })),
);
