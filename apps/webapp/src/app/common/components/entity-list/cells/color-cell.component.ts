import { ChangeDetectionStrategy, Component } from '@angular/core';
import { get } from 'lodash';

import { CellComponent } from './cell.component';

@Component({
  template: `
    <wo-color-indicator
      *ngIf="shouldShow() && color() as clr"
      [value]="clr"
      [name]="name()"
    ></wo-color-indicator>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorCellComponent extends CellComponent {
  color(): string | undefined {
    if (!this.data.column.prop) {
      return this.data.entity['color'];
    }

    return get(this.data.entity, this.data.column.prop)?.color;
  }

  name(): string | undefined {
    if (!this.data.column.prop) {
      return this.data.entity['name'];
    }

    return get(this.data.entity, this.data.column.prop)?.name;
  }
}
