import type { IEntity } from '../common/entity';
import { IShoeSample } from '../shoe-sample';
import { IShoeModel } from '../shoe-model';

export interface ShoeSizeData {
  amount: number;
}

export interface ShoeSizes {
  [size: number]: ShoeSizeData;
}

export interface IShoeOrder extends IEntity {
  sample: IShoeSample;
  model: IShoeModel;
  dateAsked?: Date;
  dateDelivery?: Date;
  notes?: string;
  sizes?: ShoeSizes;
}
