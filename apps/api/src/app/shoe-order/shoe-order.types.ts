import type { IEntity } from '../shared/entity';
import { IShoeSample } from '../shoe-sample';
import { IShoeModel } from '../shoe-model';
import { ShoeSizes } from '../../../../../libs/api-interfaces/src/lib/types/model/shoe-order.types';

export interface IShoeOrder extends IEntity {
  sample: IShoeSample;
  model: IShoeModel;
  dateAsked?: Date;
  deadline?: Date;
  dateDelivery?: Date;
  notes?: string;
  sizes?: ShoeSizes;
}
