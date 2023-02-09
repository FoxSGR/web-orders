import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BaseComponent } from '../base.component';
import { SmartForm, SmartFormState } from '../../types';

@Component({
  selector: 'wo-smart-form',
  templateUrl: './smart-form.component.html',
  styleUrls: ['./smart-form.component.scss'],
})
export class SmartFormComponent extends BaseComponent {
  /**
   * Structure of the smart form.
   */
  @Input()
  definition: SmartForm;

  /**
   * State of the form.
   */
  @Input() state: SmartFormState;
  @Output() stateChange = new EventEmitter<SmartFormState>();
}
