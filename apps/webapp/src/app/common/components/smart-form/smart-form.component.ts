import { Component, Input } from '@angular/core';

import { SmartForm } from './smart-form.types';

@Component({
  selector: 'wo-smart-from',
  templateUrl: './smart-form.component.html',
})
export class SmartFormComponent {
  @Input()
  config: SmartForm;
}
