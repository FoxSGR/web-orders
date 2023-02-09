import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';
import { SmartFormMap } from '../../../types';

@Component({
  selector: 'wo-smart-form-map',
  templateUrl: './smart-form-map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFormMapComponent extends SmartFormAbstractItemComponent<
  object,
  SmartFormMap
> {
  childProp(key: string): string {
    return `${this.prop}.${key}`;
  }

  trackBy(_index: number, key: string) {
    return key;
  }
}
