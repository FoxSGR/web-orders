import { ShoeSizes } from '@web-orders/api-interfaces';
import { IShoeSample } from '../../shoe-sample';
import { IShoeOrder } from '../shoe-order.types';

export interface IShoeOrderSample {
  order?: IShoeOrder;
  sample: IShoeSample;
  sizes?: ShoeSizes;
  totalPairs?: number;
}
