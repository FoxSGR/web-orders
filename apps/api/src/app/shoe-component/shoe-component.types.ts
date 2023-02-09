import { ComponentType } from '@web-orders/api-interfaces';
import { IEntity } from '../common';

export interface IShoeComponent extends IEntity {
  type: ComponentType;
  name: string;
  amount?: number;
  price?: number;
  notes?: string;
}
