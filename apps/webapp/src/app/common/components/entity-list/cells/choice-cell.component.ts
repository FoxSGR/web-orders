import { ChangeDetectionStrategy, Component } from '@angular/core';
import { get } from 'lodash';

import { Entity } from '../../../models/entity';
import { EntityListColumnChoices } from '../entity-list.types';
import { CellComponent } from './cell.component';

@Component({
  template: `
    <ion-label *ngIf="shouldShow()">
      <span style="font-weight: 500;">{{ data.column.name! | translate }}</span>
      <br />
      <span>{{ (value | translate) || '&nbsp;' }}</span>
    </ion-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceCellComponent<T extends Entity> extends CellComponent<
  T,
  EntityListColumnChoices<T>
> {
  /**
   * The value to show.
   */
  value: any;

  override ngOnInit() {
    super.ngOnInit();

    if (this.shouldShow()) {
      this.value = this.getValue();
    }
  }

  /**
   * Gets and processes the value.
   */
  override getValue(): any {
    let value = get(this.data.entity, this.data.column.prop!);
    if (!value || !this.data.column.choices[value]) {
      return value;
    }

    if (this.data.column.pipe) {
      value = this.data.column.pipe.transform(value);
    }

    return this.data.column.choices[value].label;
  }
}
