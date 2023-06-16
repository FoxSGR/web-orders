import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Factory } from 'nestjs-seeder';

import { Id, ShoeSizes } from '@web-orders/api-interfaces';
import { IShoeOrderSample } from './shoe-order-sample.types';
import { ShoeSample } from '../../shoe-sample';
import { ShoeOrder } from '../shoe-order.entity';

@Entity()
export class ShoeOrderSample implements IShoeOrderSample {
  @PrimaryGeneratedColumn()
  id: Id;

  @ManyToOne(() => ShoeOrder, order => order.samples)
  @JoinColumn({ name: 'orderId' })
  order: ShoeOrder;

  @Factory(faker => ({ id: faker.datatype.number(99) + 1 }))
  @ManyToOne(() => ShoeSample, { cascade: false })
  @JoinColumn()
  sample: ShoeSample;

  @Factory(faker => {
    const result: ShoeSizes = {};

    const min = faker.datatype.number({ min: 34, max: 38 });
    const max = faker.datatype.number({ min: 38, max: 42 });
    for (let i = min; i < max; i++) {
      // Skip some sizes
      if (faker.datatype.number({ min: 0, max: 2 }) > 1) {
        continue;
      }

      result[i] = faker.datatype.number({ min: 1000, max: 5000 });
    }

    return result;
  })
  @Column({ default: '{}', type: 'simple-json' })
  sizes?: ShoeSizes;

  @Factory((_, ctx) =>
    Object.values(ctx['sizes'] as ShoeSizes).reduce((a, b) => a + b, 0),
  )
  @Column({ default: 0 })
  totalPairs: number;
}
