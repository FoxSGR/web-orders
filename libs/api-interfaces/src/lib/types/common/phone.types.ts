import { CountryCode, CountryName } from './countries.types';

export interface PhoneIntlConfig {
  name: CountryName;
  code: CountryCode;
  prefix: string;
}
