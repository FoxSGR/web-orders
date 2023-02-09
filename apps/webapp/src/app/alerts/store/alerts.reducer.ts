import { createReducer, on } from '@ngrx/store';
import * as AlertActions from './alerts.actions';
import { AlertsState } from './alerts.types';

import * as uuid from 'uuid';

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
  on(AlertActions.showAlert, (state, { alert }) => ({
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
  on(AlertActions.closeAlert, (state, { id }) => ({
    ...state,
    collection: state.collection.filter((alert) => alert.id !== id),
  })),
  on(AlertActions.closeAlertsWithPosition, (state, { position }) => ({
    ...state,
    collection: state.collection.filter((alert) => alert.position !== position),
  })),
);
