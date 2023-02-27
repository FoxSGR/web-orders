import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ShoeSizes } from '@web-orders/api-interfaces';
import { IShoeOrder } from './shoe-order.types';
import { ShoeSample } from '../shoe-sample';
import { ShoeModel } from '../shoe-model';
import { OwnedEntity } from '../shared/entity';
import { Factory } from 'nestjs-seeder';
import { commonColumns } from '../shared/entity/common-columns';

@Entity()
export class ShoeOrder implements IShoeOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Factory(faker => ({ id: faker.datatype.number(99) + 1 }))
  @ManyToOne(() => ShoeSample, { cascade: false })
  @JoinColumn()
  sample: ShoeSample;

  @ManyToOne(() => ShoeModel, { cascade: true, nullable: true })
  @JoinColumn()
  model: ShoeModel;

  @Factory(faker => faker.date.recent())
  @Column({ default: null })
  dateAsked?: Date;

  @Factory(faker => faker.date.future())
  @Column({ default: null })
  deadline?: Date;

  @Factory(faker => faker.date.future())
  @Column({ default: null })
  dateDelivery?: Date;

  @Factory(commonColumns.notes.seed)
  @Column(commonColumns.notes.column)
  notes?: string;

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
  sizes: ShoeSizes;

  @Factory((_, ctx) =>
    Object.values(ctx['sizes'] as ShoeSizes).reduce((a, b) => a + b, 0),
  )
  @Column({ default: 0 })
  totalPairs: number;

  @Factory(commonColumns.ownedBase.seed)
  @Column(() => OwnedEntity, commonColumns.ownedBase.column)
  base: OwnedEntity;
}
