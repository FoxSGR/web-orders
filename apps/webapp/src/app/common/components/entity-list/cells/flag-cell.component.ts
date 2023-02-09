import { Component } from '@angular/core';
import { get } from 'lodash';

import { countries } from '@web-orders/api-interfaces';
import { CellComponent } from './cell.component';

@Component({
  template: `
    <span
      *ngIf="shouldShow() && code() as countryCode"
      class="fi fi-{{ countryCode }}"
      title="{{ title()! }}"
      style="font-size: 30px"
    ></span>
  `,
})
export class FlagCellComponent extends CellComponent {
  title(): string | undefined {
    const code = this.code();
    if (!code) {
      return;
    }

    return countries[code.toLocaleUpperCase()];
  }

  code(): string | undefined {
    return get(this.data.entity, this.data.column.prop!)?.toLocaleLowerCase();
  }
}
