/**
 * The position of the alerts.
 */
export type AlertPosition = 'toast';

/**
 * The type of an alert.
 */
export type AlertType = 'success' | 'info' | 'warning' | 'error';

/**
 * Represents an alert.
 */
export interface Alert {
  /**
   * The id of the alert.
   * Should only be set by the reducer.
   */
  id?: string;

  /**
   * The type of the alert.
   */
  type: AlertType;

  /**
   * The message shown by the alert.
   */
  message: string;

  /**
   * The position to show the alert at.
   */
  position?: AlertPosition;

  /**
   * The timeout to hide the alert, in seconds.
   * Set as -1 to disable.
   */
  timeout?: number;
}

/**
 * Represents the alerts in the state.
 */
export type AlertsState = {
  collection: Alert[];
};
