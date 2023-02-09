import { Component, OnInit } from '@angular/core';
import { ThemeService } from './common';

@Component({
  selector: 'wo-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  /**
   * Whether the app is in print mode.
   * @private
   */
  private printMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    this.themeService.printMode = urlParams.get('print') === 'true';

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this._toggleDarkTheme(prefersDark.matches);
    prefersDark.addEventListener('change', mediaQuery =>
      this._toggleDarkTheme(mediaQuery.matches),
    );
  }

  /**
   * Toggles the dark theme.
   * @param value
   */
  private _toggleDarkTheme(value: boolean) {
    this.themeService.changeDarkTheme(value);
  }
}
