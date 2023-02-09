import { ComponentType, IShoeComponentDTO } from '@web-orders/api-interfaces';
import { Entity } from './entity';

export class ShoeComponent extends Entity implements IShoeComponentDTO {
  name: string;
  type: ComponentType;
  amount?: number;
  price?: number;
  notes?: string;
}
