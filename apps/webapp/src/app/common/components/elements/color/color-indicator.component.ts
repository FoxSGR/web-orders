import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'wo-color-indicator',
  template: `
    <span
      class="wo-cell-color"
      [title]="name || value"
      [ngStyle]="{ backgroundColor: value || 'transparent' }"
    ></span>
  `,
  styles: [
    `
      :host {
        display: flex;
      }

      .wo-cell-color {
        display: inline-block;
        border-radius: 100%;
        width: 30px;
        height: 30px;
        border: 0.5px solid rgba(0, 0, 0, 0.3);
      }
    `,
  ],
  standalone: true,
  imports: [NgStyle],
})
export class ColorIndicatorComponent {
  @Input() value?: string;
  @Input() name?: string;
}
