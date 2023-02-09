import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
} from '@angular/core';
import { set } from 'lodash';

import { SmartFormPhone, SmartFormPhoneInput } from '../../../types';
import { PhoneService } from '../../../services';
import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';
import { SelectSearchOption } from '../../select-search';

@Component({
  selector: 'wo-smart-form-phone-input',
  templateUrl: './smart-form-phone-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFormPhoneInputComponent
  extends SmartFormAbstractItemComponent<SmartFormPhone, SmartFormPhoneInput>
  implements OnInit
{
  intlConfigOptions?: SelectSearchOption<string>[];

  override defaultValue = {
    prefix: undefined,
    value: '',
  };

  constructor(injector: Injector, private phoneService: PhoneService) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();

    this.phoneService.getIntlConfigs().subscribe(configs => {
      this.intlConfigOptions = configs.map(config => ({
        id: config.code,
        value: config.prefix,
        label: `(${config.prefix}) ${config.name}`,
      }));
    });
  }

  onPrefixChange() {
    if (
      this.value?.prefix &&
      this.formDefinition.items['address']?.['children']?.['country'] &&
      !this.state.values['address']?.['country']
    ) {
      const option = this.intlConfigOptions!.find(
        config => config.value === this.value!.prefix,
      );
      if (option) {
        set(this.state.values, 'address.country', option.id);
      }
    }

    this.onChange();
  }
}
