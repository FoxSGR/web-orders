import { Component, Inject } from '@angular/core';

import get from 'lodash/get';

import { ENTITY_LIST_TOKEN, EntityListCellData } from '../entity-list.token';

@Component({
  template: `
    <ion-label>
      <span style="font-weight: 500;">{{ data.column.name! | translate }}</span>
      <br />
      <span>{{ value() }}</span>
    </ion-label>
  `,
})
export class BasicCellComponent<T> {
  constructor(@Inject(ENTITY_LIST_TOKEN) public data: EntityListCellData<T>) {}

  value(): any {
    let value = get(this.data.entity, this.data.column.prop!);

    if (this.data.column.pipe) {
      value = this.data.column.pipe.transform(value);
    }

    return value;
  }
}
