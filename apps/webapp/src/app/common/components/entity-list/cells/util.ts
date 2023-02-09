import { get } from 'lodash';

import { countries } from '@web-orders/api-interfaces';

export const inlineFlag = (entity: any, prop: string) => {
  const countryCode: string = get(entity, prop);
  if (!countryCode) {
    return '';
  }

  const countryName = countries[countryCode.toLocaleUpperCase()];
  return `
    <span
      class="fi fi-${countryCode.toLocaleLowerCase()}"
      title="${countryName}"
    ></span>
  `;
};
