import {
  ComponentType,
  IShoeComponentDTO,
  OrnamentType,
} from '@web-orders/api-interfaces';
import { Entity } from './entity';

export class ShoeComponent extends Entity implements IShoeComponentDTO {
  reference: string;
  name: string;
  type: ComponentType;
  ornamentType?: OrnamentType;
  amount?: number;
  price?: number;
  notes?: string;
}
