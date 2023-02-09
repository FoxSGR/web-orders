import { Component, ViewChild } from '@angular/core';

import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';
import { SmartFormColor } from '../../../types';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'wo-smart-form-color',
  templateUrl: './smart-form-color.component.html',
})
export class SmartFormColorComponent extends SmartFormAbstractItemComponent<
  string,
  SmartFormColor
> {
  @ViewChild('colorInput', { read: IonInput })
  colorInput!: IonInput;

  async openInput() {
    const element = await this.colorInput.getInputElement();
    element.click();
  }
}
