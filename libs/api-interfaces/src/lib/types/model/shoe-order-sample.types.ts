import { IShoeSampleDTO } from './shoe-sample.types';
import { ShoeSizes } from '../common';

export interface IShoeOrderSampleDTO {
  sample: IShoeSampleDTO;
  sizes?: ShoeSizes;
  totalPairs?: number;
}
