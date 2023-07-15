import { ChangeDetectionStrategy, Component } from '@angular/core';
import { get } from 'lodash';

import { CellComponent } from './cell.component';

interface ListCellConfig {
  titleProp: string;
  trackByProp: string;
}

@Component({
  template: `
    <ion-label *ngIf="shouldShow()">
      <span style="font-weight: 500;">{{ data.column.name! | translate }}</span>
      <div *ngIf="list() as items">
        <div *ngFor="let item of items; trackBy: trackBy.bind(this)">
          {{ itemTitle(item) }}
        </div>
      </div>
    </ion-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCellComponent extends CellComponent {
  list(): any[] {
    return get(this.data.entity, this.data.column.prop!);
  }

  itemTitle(item: any) {
    return get(item, this.data.column.summaryTemplate.titleProp);
  }

  trackBy(index: number, item: any): any {
    return get(item, this.data.column.summaryTemplate.trackByProp);
  }
}
