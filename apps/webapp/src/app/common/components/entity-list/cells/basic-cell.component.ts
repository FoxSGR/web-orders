import { Component, OnInit } from '@angular/core';

import { CellComponent } from './cell.component';

@Component({
  template: `
    <ion-label *ngIf="shouldShow()">
      <span style="font-weight: 500;">{{ data.column.name! | translate }}</span>
      <br />
      <span>{{ value || '&nbsp;' }}</span>
    </ion-label>
  `,
})
export class BasicCellComponent extends CellComponent implements OnInit {
  value: any;

  override ngOnInit() {
    super.ngOnInit();

    if (this.shouldShow()) {
      this.value = this.getValue();
    }
  }
}
