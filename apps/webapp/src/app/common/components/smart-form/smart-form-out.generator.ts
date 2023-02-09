import { get, set } from 'lodash';

import {
  SmartForm,
  SmartFormEntitySelect,
  SmartFormItem,
  SmartFormPhone,
  SmartFormState,
} from '../../types';
import { Entity } from '../../models/entity';
import { customEmpty } from '../../util';
import { SmartFormWalker } from './smart-form-walker';

/**
 * Generates a model from a smart form.
 */
export class SmartFormOutGenerator<T extends object> {
  private readonly model: Partial<T>;
  private readonly definitions: SmartForm[];

  constructor(
    private readonly state: SmartFormState,
    private readonly cleanup = true,
    ...definitions: SmartForm[]
  ) {
    this.model = {};
    this.definitions = definitions;
  }

  /**
   * Generates a model from a smart form.
   */
  generate(): Partial<T> | undefined {
    if (!this.state) {
      return undefined;
    }

    const walker = new SmartFormWalker(this.state, ...this.definitions);
    walker.walk((item, value, prop, targetProp) =>
      this.generateFromItem(item, value, prop, targetProp),
    );

    return this.model;
  }

  private generateFromItem(
    item: SmartFormItem,
    value: any,
    prop: string,
    targetProp = prop,
  ) {
    if (customEmpty(value)) {
      return;
    }

    switch (item.type) {
      case 'multiple':
      case 'group':
        return;
      case 'entity-select':
        value = this.generateFromEntitySelect(item, value);
        break;
      case 'phone-input':
        value = this.generateFromPhoneNumber(value);
        break;
    }

    this.setValue(targetProp, value);

    if (item.generation?.flatten) {
      this.flatten(item, prop, targetProp);
    }
  }

  private generateFromEntitySelect(
    item: SmartFormEntitySelect<Entity[]>,
    selection: Entity[],
  ) {
    let value: any = selection;
    if (Array.isArray(value) && this.cleanup) {
      value = value.map(v => ({ id: v.id }));
    }

    if (item.config.selection === 'single') {
      value = value?.[0];
    }

    return value;
  }

  private generateFromPhoneNumber(value: SmartFormPhone | undefined) {
    if (!value) {
      return undefined;
    }

    const prefix = value.prefix || '';
    const phoneValue = value.value || '';
    return `${prefix}${phoneValue}`;
  }

  private flatten(item: SmartFormItem, prop: string, targetProp: string) {
    if (!item.generation?.flatten) {
      return;
    }

    let collection = get(this.model, item.generation.flatten.to);
    if (!collection) {
      collection = [];
      set(this.model, item.generation.flatten.to, collection);
    }

    const value = get(this.model, targetProp);

    if (item.type === 'multiple' && Array.isArray(value)) {
      collection.push(...value);
    } else if (value) {
      collection.push(value);
    }

    delete this.model[prop];
  }

  private setValue(prop: string, value: any) {
    if (value) {
      set(this.model, prop, value);
    }
  }
}
