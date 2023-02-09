import {
  Directive,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { cloneDeep, get, set } from 'lodash';

import { SmartForm, SmartFormItem, SmartFormState } from '../../types';
import { BaseComponent } from '../base.component';

@Directive()
export class SmartFormAbstractItemComponent<
  T,
  S extends SmartFormItem<T>,
> extends BaseComponent {
  /**
   * Full definition of the form.
   */
  @Input() formDefinition: SmartForm;

  /**
   * Definition of the current item.
   */
  @Input() definition: S;

  /**
   * Prop path that leads to the value of the current item in the state.
   */
  @Input() prop: string;

  /**
   * State of the form.
   */
  @Input() state: SmartFormState;
  @Output() stateChange = new EventEmitter<SmartFormState>();

  /**
   * Accessors for the value of the current item.
   */
  get value(): T | undefined {
    return this.getValue();
  }
  set value(v: T | undefined) {
    set(this.state.values, this.prop, v);
  }

  /**
   * The default value.
   * @protected
   */
  protected defaultValue?: T;

  override ngOnInit() {
    super.ngOnInit();
    this.checkValue();
  }

  ngAfterViewChecked() {
    this.checkValue();
  }

  ngOnChanges() {
    this.checkValue();
  }

  /**
   * Handles changes in the value.
   */
  onChange() {
    this.definition.onChange?.(this.value, this.state);
    this.stateChange.emit(this.state);
  }

  /**
   * Whether the form field is disabled.
   * @returns
   */
  isDisabled(): boolean {
    if (!this.definition.disabled) {
      return false;
    }

    return this.definition.disabled(this.state, this.prop);
  }

  /**
   * Finds the value of the current item in the state.
   * @param state
   * @protected
   */
  protected getValue(state = this.state) {
    return get(this.state.values, this.prop);
  }

  /**
   * Checks if the value is empty and replaces it with the default.
   * @protected
   */
  protected checkValue() {
    if (this.value || !(this.definition.default || this.defaultValue)) {
      return;
    }

    this.value = cloneDeep(this.definition.default || this.defaultValue);
  }
}
