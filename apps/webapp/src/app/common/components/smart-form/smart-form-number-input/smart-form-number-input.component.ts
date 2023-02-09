import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SmartFormNumberInput } from '../../../types';
import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';

@Component({
  selector: 'wo-smart-form-number-input',
  template: `
    <ion-item [disabled]="disabled">
      <ion-label *ngIf="definition.label" position="stacked">
        {{ definition.label | translate }}
      </ion-label>
      <ion-input
        type="number"
        [placeholder]="definition.placeholder | translate"
        [(ngModel)]="value"
        (ionChange)="onChange()"
        [min]="definition.min || 0"
        [max]="definition.max || 9999999999"
        [maxlength]="definition.maxLength || 10"
      >
        <ion-text
          *ngIf="definition.unit"
          style="
            float: right;
            right: 7px;
            position: absolute
          "
        >
          {{ definition.unit | translate }}
        </ion-text>
      </ion-input>
    </ion-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFormNumberInputComponent extends SmartFormAbstractItemComponent<
  string,
  SmartFormNumberInput
> {}
