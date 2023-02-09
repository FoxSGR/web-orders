import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

/**
 * The logger of the application.
 * Encapsulates the logging mechanism.
 */
@Injectable({
  providedIn: 'root',
})
export class Logger {
  constructor(private logger: NGXLogger) {}

  /**
   * Logs an error.
   * @param message the error message.
   */
  error(message: string): void {
    this.logger.error(message);
  }

  /**
   * Logs an info message.
   * @param message the info message.
   */
  info(message: string): void {
    this.logger.info(message);
  }
}
