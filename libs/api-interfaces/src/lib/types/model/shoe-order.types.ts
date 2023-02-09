import { IEntityDTO } from './entity.types';
import { IShoeSampleDTO } from './shoe-sample.types';

export interface ShoeSizeData {
  amount: number;
}

export interface ShoeSizes {
  [size: number]: ShoeSizeData;
}

export interface IShoeOrderDTO extends IEntityDTO {
  sample: IShoeSampleDTO;
  dateAsked?: Date;
  deadline?: Date;
  dateDelivery?: Date;
  notes?: string;
  sizes?: ShoeSizes;
}
