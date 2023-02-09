import { get } from 'lodash';

type SmartFormWalkerCallback = (
  item: SmartFormItem,
  value: any,
  prop: string,
  targetProp: string,
) => void;

import {
  SmartForm,
  SmartFormGroup,
  SmartFormItem,
  SmartFormMultiple,
  SmartFormState,
} from '../../types';

export class SmartFormWalker<T extends object> {
  private readonly definitions: SmartForm[];
  private callback!: SmartFormWalkerCallback;

  constructor(
    private readonly state: SmartFormState,
    ...definition: SmartForm[]
  ) {
    this.definitions = definition;
  }

  walk(callback: SmartFormWalkerCallback) {
    if (!this.state) {
      return;
    }

    this.callback = callback;
    for (const definition of this.definitions) {
      this.walkDefinition(definition);
    }
  }

  private walkDefinition(definition: SmartForm) {
    for (const [key, item] of Object.entries(definition.items)) {
      this.walkItem(item, key);
    }
  }

  private walkItem(item: SmartFormItem, prop: string, targetProp = prop) {
    if (item.generation?.prop) {
      targetProp = item.generation.prop;
    }

    const value = get(this.state.values, prop);

    if (item.type === 'multiple') {
      this.walkMultiple(item, prop, targetProp, value);
      this.callback(item, value, prop, targetProp);
    } else if (item.type === 'group') {
      this.walkGroup(item, prop, targetProp);
      this.callback(item, value, prop, targetProp);
    } else {
      this.callback(item, value, prop, targetProp);
    }
  }

  private walkMultiple(
    item: SmartFormMultiple,
    prop: string,
    targetProp: string,
    value: any[],
  ) {
    if (!value) {
      return;
    }

    for (let i = 0; i < value.length; i++) {
      this.walkItem(item.children, `${prop}.${i}`, `${targetProp}.${i}`);
    }
  }

  private walkGroup(item: SmartFormGroup, prop: string, targetProp: string) {
    for (const [key, value] of Object.entries(item.children)) {
      this.walkItem(value, `${prop}.${key}`, `${targetProp}.${key}`);
    }
  }
}
