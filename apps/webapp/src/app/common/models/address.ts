import { IAddressDTO } from '@web-orders/api-interfaces';

export class Address implements IAddressDTO {
  line1: string;
  line2: string;
  zipCode: string;
  city: string;
  country: string;
}
