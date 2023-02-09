import { Component, OnInit } from '@angular/core';
import { ThemeService } from './common';

@Component({
  selector: 'wo-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
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
