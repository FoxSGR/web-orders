import { ShoeSizes } from '@web-orders/api-interfaces';
import type { IEntity } from '../shared/entity';
import { IShoeSample } from '../shoe-sample';
import { IShoeModel } from '../shoe-model';

export interface IShoeOrder extends IEntity {
  sample: IShoeSample;
  model: IShoeModel;
  dateAsked?: Date;
  deadline?: Date;
  dateDelivery?: Date;
  notes?: string;
  sizes?: ShoeSizes;
  totalPairs: number;
}
