import { IShoeOrderDTO, ShoeSizes } from '@web-orders/api-interfaces';
import { Entity } from './entity';
import { ShoeSample } from './shoe-sample';

export class ShoeOrder extends Entity implements IShoeOrderDTO {
  sample: ShoeSample;
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
        ['sample', ShoeSample as any], // for some reason "as any" fixed the typescript error here
      ]),
    );
  }
}
