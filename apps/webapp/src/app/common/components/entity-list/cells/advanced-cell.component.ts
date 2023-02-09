import { Component, Inject } from '@angular/core';

import get from 'lodash/get';

import { ENTITY_LIST_TOKEN, EntityListCellData } from '../entity-list.token';

@Component({
  template: `
    <ion-label>
      <ng-container
        *ngFor="let row of data.column.summaryTemplate; let i = index"
      >
        <span style="font-weight: 500;">{{ row.name | translate }}: </span>
        <ng-container *ngIf="row.inline">
          <span
            style="margin-right: 4px;"
            [innerHTML]="row.inline(data.entity)"
          ></span>
        </ng-container>
        <span>{{ value(row.prop) }}</span>
        <br *ngIf="i !== data.column.summaryTemplate.length" />
      </ng-container>
    </ion-label>
  `,
})
export class AdvancedCellComponent<T> {
  constructor(@Inject(ENTITY_LIST_TOKEN) public data: EntityListCellData<T>) {}

  value(prop: string): any {
    let value = get(this.data.entity, prop);

    if (this.data.column.pipe) {
      value = this.data.column.pipe.transform(value);
    }

    return value;
  }
}
