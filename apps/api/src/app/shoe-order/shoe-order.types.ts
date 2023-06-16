import type { IEntity } from '../shared/entity';
import { IShoeOrderSample } from './shoe-order-sample/shoe-order-sample.types';

export interface IShoeOrder extends IEntity {
  samples: IShoeOrderSample[];
  dateAsked?: Date;
  deadline?: Date;
  dateDelivery?: Date;
  notes?: string;
  totalPairs: number;
}
