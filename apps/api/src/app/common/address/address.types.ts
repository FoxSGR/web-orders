import { IEntity } from '../types';

export interface IAddress extends IEntity {
  line1: string;
  line2: string;
  city: string;
  zipCode: string;
  country: string;
}
