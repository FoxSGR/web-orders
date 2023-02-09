import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SmartFormTextInput } from '../../../types';
import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';

@Component({
  selector: 'wo-smart-form-text-input',
  template: `
    <ion-item [disabled]="isDisabled()">
      <ion-label *ngIf="definition.label" position="stacked">
        {{ definition.label | translate }}
      </ion-label>
      <ion-input
        [placeholder]="definition.placeholder | translate"
        [(ngModel)]="value"
        (ionChange)="onChange()"
        [maxlength]="definition.maxLength || 240"
        [required]="definition.required || false"
      ></ion-input>
    </ion-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFormTextInputComponent extends SmartFormAbstractItemComponent<
  string,
  SmartFormTextInput
> {}
