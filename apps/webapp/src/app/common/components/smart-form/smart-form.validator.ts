import { TranslateService } from '@ngx-translate/core';
import { SmartForm, SmartFormItem, SmartFormState } from '../../types';
import { SmartFormWalker } from './smart-form-walker';
import { customEmpty } from '../../util';

export interface SmartFormValidatorResult {
  prop: string;
  message: string;
}

export class SmartFormValidator {
  private readonly definitions: SmartForm[];

  constructor(
    private readonly translate: TranslateService,
    private readonly state: SmartFormState,
    ...definitions: SmartForm[]
  ) {
    this.definitions = definitions;
  }

  validate(): SmartFormValidatorResult[] {
    const results: SmartFormValidatorResult[] = [];

    const walker = new SmartFormWalker(this.state, ...this.definitions);
    walker.walk((item, value, prop) => {
      const result = this.validateItem(item, value, prop);
      if (result) {
        results.push(result);
      }
    });

    return results;
  }

  private validateItem(
    item: SmartFormItem,
    value: any,
    prop: string,
  ): SmartFormValidatorResult | undefined {
    if (item.required && customEmpty(value)) {
      const label = this.translate.instant(item.label!);

      const message = this.translate.instant(
        'str.common.smartForm.validation.required.message',
        { field: label },
      );
      return { prop, message };
    }

    return undefined;
  }
}
