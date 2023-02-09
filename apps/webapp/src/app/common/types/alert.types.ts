/**
 * The position of the alerts.
 */
export type AlertPosition = 'toast';

/**
 * The type of alert.
 */
export type AlertType = 'success' | 'info' | 'warning' | 'error';

/**
 * A button for an alert.
 */
export interface AlertButton {
  text: string;
  icon?: string;
  callback: () => void;
}

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
   * Message string parameters to replace.
   */
  messageParams?: object;

  /**
   * Buttons to show in the alert.
   */
  buttons?: AlertButton[];

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
