import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';

@Component({
  selector: 'wo-smart-form-item',
  templateUrl: './smart-form-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFormItemComponent extends SmartFormAbstractItemComponent<
  any,
  any
> {}
