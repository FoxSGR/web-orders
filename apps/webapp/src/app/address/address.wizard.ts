import { countries, CountryCode } from '@web-orders/api-interfaces';
import { SmartForm } from '../common/types';
import { WOItemMap } from '../common';

export const countryMap: WOItemMap<CountryCode> = {} as any;
for (const [code, countryName] of Object.entries(countries)) {
  countryMap[code] = {
    label: countryName,
  };
}

export const personalForm: SmartForm = {
  items: {
    country: {
      type: 'choices',
      label: 'str.common.address.country',
      choices: countryMap,
      generation: {
        prop: 'address.country',
      },
    },
    phoneNumber: {
      type: 'phone-input',
      label: 'str.common.phoneNumber',
    },
  },
};

export const addressForm: SmartForm = {
  items: {
    addressHeader: {
      type: 'header',
      label: 'str.common.address.address',
    },
    line1: {
      type: 'text-input',
      label: 'str.common.address.line1',
      placeholder: 'str.common.address.placeholder.line1',
    },
    line2: {
      type: 'text-input',
      label: 'str.common.address.line2',
      placeholder: 'str.common.address.placeholder.line2',
    },
    city: {
      type: 'text-input',
      label: 'str.common.address.city',
      placeholder: 'str.common.address.placeholder.city',
    },
    zipCode: {
      type: 'text-input',
      label: 'str.common.address.zipCode',
      placeholder: 'str.common.address.placeholder.zipCode',
    },
  },
};
