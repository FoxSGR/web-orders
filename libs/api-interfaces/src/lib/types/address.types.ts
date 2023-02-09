import { IEntityDTO } from './entity.types';

export interface IAddressDTO extends IEntityDTO {
  line1: string;
  line2: string;
  zipCode: string;
  city: string;
  country: string;
}
