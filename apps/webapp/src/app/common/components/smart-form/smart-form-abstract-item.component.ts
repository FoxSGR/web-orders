import {
  AfterViewChecked,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { cloneDeep, get, set } from 'lodash';
import { Observable } from 'rxjs';

import { SmartForm, SmartFormItem, SmartFormState } from '../../types';
import { BaseComponent } from '../base.component';

@Directive()
export class SmartFormAbstractItemComponent<T, S extends SmartFormItem<T>>
  extends BaseComponent
  implements OnInit, AfterViewChecked, OnChanges
{
  /**
   * Observable to keep up with changes.
   */
  @Input() change: Observable<SmartFormState>;

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
   * Whether the form field is disabled.
   */
  disabled = false;

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
   * Finds the value of the current item in the state.
   * @protected
   */
  protected getValue() {
    return get(this.state.values, this.prop);
  }

  /**
   * Checks if the value is empty and replaces it with the default.
   * @protected
   */
  protected checkValue() {
    if (!this.value && (this.definition.default || this.defaultValue)) {
      this.restoreDefaultValue();
    }

    const disabled = this.isDisabled();
    if (disabled !== this.disabled) {
      this.disabled = disabled;
      this.cdr.detectChanges();
    }
  }

  /**
   * Restores the default value.
   * @protected
   */
  protected restoreDefaultValue() {
    this.value = cloneDeep(this.definition.default || this.defaultValue);
  }

  /**
   * Whether the form field is disabled.
   * @returns
   */
  private isDisabled(): boolean {
    if (!this.definition.disabled) {
      return false;
    }

    return this.definition.disabled(this.state, this.prop);
  }
}
