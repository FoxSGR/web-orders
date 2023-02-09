import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlertPosition, AlertsState } from './alerts.types';

/**
 * Selector to get all of the alerts.
 */
export const getAlerts = createFeatureSelector<AlertsState>('alerts');

/**
 * Selector to get the alerts in a position.
 */
export const getAlertsWithPosition = createSelector(
  getAlerts,
  (state: AlertsState, { position }: { position: AlertPosition }) =>
    state.collection.filter((alert) => alert.position === position),
);
