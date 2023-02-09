import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CellComponent } from './cell.component';

@Component({
  template: `
    <ion-label *ngIf="shouldShow()">
      <ng-container
        *ngFor="let row of data.column.summaryTemplate; let i = index"
      >
        <span style="font-weight: 500;">{{ row.name | translate }}: </span>
        <span
          *ngIf="row.inline"
          style="margin-right: 4px;"
          [innerHTML]="row.inline(data.entity)"
        ></span>
        <span>{{ getValue(row.prop) }}</span>
        <br *ngIf="i !== data.column.summaryTemplate.length" />
      </ng-container>
    </ion-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedCellComponent extends CellComponent {}
