import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service to manage theme related data.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  /**
   * Whether dark mode is enabled.
   * @private
   */
  private _darkTheme$ = new BehaviorSubject<boolean>(false);
  get darkTheme$(): Observable<boolean> {
    return this._darkTheme$.asObservable();
  }

  /**
   * Changes the value of dark mode.
   * @see _darkTheme$
   * @param value
   */
  changeDarkTheme(value: boolean) {
    document.body.classList.toggle('dark', value);
    this._darkTheme$.next(value);
  }
}
