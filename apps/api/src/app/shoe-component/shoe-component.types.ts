import { ComponentType, OrnamentType } from '@web-orders/api-interfaces';
import type { IEntity } from '../shared/entity';

export interface IShoeComponent extends IEntity {
  type: ComponentType;
  ornamentType?: OrnamentType;

  reference?: string;
  name?: string;
  amount?: number;
  price?: number;
  notes?: string;
}
