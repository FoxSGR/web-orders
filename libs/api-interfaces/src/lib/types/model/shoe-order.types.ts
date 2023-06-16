import { IEntityDTO } from './entity.types';
import { IShoeOrderSampleDTO } from './shoe-order-sample.types';

export interface IShoeOrderDTO extends IEntityDTO {
  samples: IShoeOrderSampleDTO[];
  dateAsked?: Date;
  deadline?: Date;
  dateDelivery?: Date;
  notes?: string;
  totalPairs: number;
}
