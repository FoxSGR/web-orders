import {
  IShoeOrderDTO,
  IShoeOrderSampleDTO,
  ShoeSizes,
} from '@web-orders/api-interfaces';
import { Entity } from './entity';
import { ShoeSample } from './shoe-sample';

export class ShoeOrderSample extends Entity implements IShoeOrderSampleDTO {
  sample: ShoeSample;
  sizes: ShoeSizes;
}

export class ShoeOrder extends Entity implements IShoeOrderDTO {
  samples: ShoeOrderSample[];
  sizes: ShoeSizes;
  dateAsked: Date;
  dateDelivery: Date;
  deadline: Date;
  notes: string;
  totalPairs: number;

  constructor(order: IShoeOrderDTO) {
    super(order);
    this.initChildEntities(
      order,
      new Map([
        ['samples', ShoeOrderSample as any], // for some reason "as any" fixed the typescript error here
      ]),
    );
  }
}
