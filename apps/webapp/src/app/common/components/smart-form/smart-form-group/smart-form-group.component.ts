import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';
import { SmartFormGroup } from '../../../types';

@Component({
  selector: 'wo-smart-form-group',
  templateUrl: './smart-form-group.component.html',
  styleUrls: ['smart-form-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFormGroupComponent
  extends SmartFormAbstractItemComponent<object, SmartFormGroup>
  implements OnInit
{
  override ngOnInit() {
    super.ngOnInit();
    if (!this.value) {
      this.value = this.definition.default || {};
    }
  }

  childProp(key: string): string {
    return `${this.prop}.${key}`;
  }

  isHidden(key: string): boolean {
    if (!this.definition.children[key]?.hidden) {
      return false;
    }

    return !!this.definition.children[key].hidden?.(
      this.state,
      this.childProp(key),
    );
  }
}
