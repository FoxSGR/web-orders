import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';

import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';
import { SmartFormChoices } from '../../../types';
import { WOItem } from '../../../wo-common.types';
import { SelectSearchOption } from '../../select-search';

@Component({
  selector: 'wo-smart-form-choices',
  templateUrl: './smart-form-choices.component.html',
})
export class SmartFormChoicesComponent<T extends string>
  extends SmartFormAbstractItemComponent<T, SmartFormChoices<T>>
  implements OnInit
{
  options: SelectSearchOption[];

  override ngOnInit() {
    super.ngOnInit();

    const comparator = this.comparator();
    this.options = Object.entries(this.definition.choices)
      .map(([key, value]) => ({ key, value } as KeyValue<T, WOItem>))
      .sort((a, b) => comparator(a, b))
      .map(choice => ({
        id: choice.key,
        value: choice.key,
        label: choice.value.label.startsWith('str.')
          ? this.translate.instant(choice.value.label)
          : choice.value.label,
      }));
  }

  /**
   * Comparator to sort by numeric value.
   * @param a
   * @param b
   */
  private numberComparator = (a: KeyValue<T, WOItem>, b: KeyValue<T, WOItem>) =>
    Number(a.value.label) - Number(b.value.label);

  /**
   * Finds the most appropriate comparator to sort object entries.
   */
  private comparator(): (
    a: KeyValue<T, WOItem>,
    b: KeyValue<T, WOItem>,
  ) => number {
    const key = Object.keys(this.definition.choices)[0];
    const firstValue = this.definition.choices[key] as WOItem;
    if (firstValue?.label.match(/^\d+(\.\d+)?$/)) {
      return this.numberComparator;
    } else {
      return this.originalOrder;
    }
  }
}
