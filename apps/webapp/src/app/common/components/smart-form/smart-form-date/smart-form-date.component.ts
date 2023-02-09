import { Component, ElementRef, ViewChild } from '@angular/core';

import { SmartFormDate } from '../../../types';
import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';

@Component({
  selector: 'wo-smart-form-date',
  templateUrl: './smart-form-date.component.html',
  styleUrls: ['./smart-form-date.component.scss'],
})
export class SmartFormDateComponent extends SmartFormAbstractItemComponent<
  string,
  SmartFormDate
> {
  @ViewChild('datetimeButton', { read: ElementRef })
  datetimeButton: ElementRef;

  override ngOnInit() {
    super.ngOnInit();

    if ((this.value as any) instanceof Date) {
      this.value = (this.value as any).toISOString();
    }
  }

  openDatePicker() {
    this.datetimeButton.nativeElement?.shadowRoot
      ?.querySelector('button')
      ?.click();
  }
}
