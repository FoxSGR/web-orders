import { Injector } from '@angular/core';
import { get, set } from 'lodash';

import {
  SmartForm,
  SmartFormFiles,
  SmartFormItem,
  SmartFormPhone,
  SmartFormState,
} from '../../types';
import { PhoneService } from '../../services';
import { firstValueFrom } from 'rxjs';
import { APIFile } from '@web-orders/api-interfaces';

export class SmartFormInGenerator<T extends object> {
  private readonly phoneService: PhoneService;

  private readonly definitions: SmartForm[];
  private state!: SmartFormState;

  constructor(
    injector: Injector,
    private readonly model: T,
    ...definitions: SmartForm[]
  ) {
    this.definitions = definitions;

    this.phoneService = injector.get(PhoneService);
  }

  async generate(): Promise<SmartFormState> {
    this.state = { values: {} };

    for (const definition of this.definitions) {
      await this.generateFromDefinition(definition);
    }

    return this.state;
  }

  private async generateFromDefinition(definition: SmartForm) {
    for (const [key, item] of Object.entries(definition.items)) {
      await this.generateFromItem(item, key);
    }
  }

  private async generateFromItem(item: SmartFormItem, prop: string) {
    if (item.generation?.flatten) {
      this.unflatten(item, prop);
    }

    let value = get(this.model, item.generation?.prop || prop);
    if (!value) {
      return;
    }

    switch (item.type) {
      case 'header':
        return; // ignore
      case 'entity-select':
        if (!Array.isArray(value)) {
          value = [value];
        }
        break;
      case 'phone-input':
        value = await this.generateFromPhoneNumber(value);
        break;
      case 'file-upload':
        value = this.generateFromFileUpload(value);
        break;
      case 'multiple':
        for (let i = 0; i < value.length; i++) {
          await this.generateFromItem(item.children, `${prop}.${i}`);
        }
        return;
      case 'group':
        for (const [k, v] of Object.entries(item.children)) {
          await this.generateFromItem(v, `${prop}.${k}`);
        }
        return;
    }

    set(this.state.values, prop, value);
  }

  private async generateFromPhoneNumber(
    value: string | undefined,
  ): Promise<SmartFormPhone> {
    if (!value) {
      return {
        prefix: undefined,
        value: '',
      };
    }

    const phoneIntlConfigs = await firstValueFrom(
      this.phoneService.getIntlConfigs(),
    );

    const prefix = this.phoneService.prefixFromNumber(phoneIntlConfigs, value);
    if (prefix) {
      value = value.replace(prefix, '');
    } else if (value.startsWith('+')) {
      value = value.substring(1);
    }

    return {
      prefix,
      value,
    };
  }

  private generateFromFileUpload(files: APIFile[] | APIFile): SmartFormFiles {
    if (!Array.isArray(files)) {
      files = [files];
    }

    return {
      files: files.map(file => ({
        ...file,
        state: 'stored',
      })),
    };
  }

  private unflatten(item: SmartFormItem, prop: string) {
    if (!item.generation?.flatten) {
      return;
    }

    const flattened: object[] = get(this.model, item.generation.flatten.to);
    if (!flattened) {
      return;
    }

    const propParts = prop.split('.');
    const idx = propParts[propParts.length - 1];

    let result: any = flattened.filter(
      i => get(i, item.generation!.flatten!.by) === idx,
    );
    if (item.type !== 'multiple') {
      result = result[0];
    }

    set(this.model, prop, result);
  }
}
