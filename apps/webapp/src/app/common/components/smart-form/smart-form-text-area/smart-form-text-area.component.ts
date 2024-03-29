import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SmartFormTextArea } from '../../../types';
import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';

@Component({
  selector: 'wo-smart-form-text-area',
  template: `
    <ion-item [disabled]="disabled">
      <ion-label *ngIf="definition.label" position="stacked">
        {{ definition.label | translate }}
      </ion-label>
      <ion-textarea
        [placeholder]="definition.placeholder | translate"
        [(ngModel)]="value"
        (ionChange)="onChange()"
        [maxlength]="900"
      ></ion-textarea>
    </ion-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFormTextAreaComponent extends SmartFormAbstractItemComponent<
  string,
  SmartFormTextArea
> {}
