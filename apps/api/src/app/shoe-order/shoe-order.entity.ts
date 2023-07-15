import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DataFactory, Factory } from 'nestjs-seeder';

import { Id } from '@web-orders/api-interfaces';
import { IShoeOrder } from './shoe-order.types';
import { OwnedEntity } from '../shared/entity';
import { commonColumns } from '../shared/entity/common-columns';
import { ShoeOrderSample } from './shoe-order-sample/shoe-order-sample.entity';

@Entity()
export class ShoeOrder implements IShoeOrder {
  @PrimaryGeneratedColumn()
  id: Id;

  @Factory(faker =>
    DataFactory.createForClass(ShoeOrderSample).generate(
      faker.datatype.number(12),
    ),
  )
  @OneToMany(() => ShoeOrderSample, orderSample => orderSample.order, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  @JoinTable()
  samples: ShoeOrderSample[];

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

  @Factory((_, ctx) => {
    let total = 0;

    for (const sample of ctx['samples'] as ShoeOrderSample[]) {
      total += sample.totalPairs;
    }

    return total;
  })
  @Column({ default: 0 })
  totalPairs: number;

  @Factory(commonColumns.ownedBase.seed)
  @Column(() => OwnedEntity, commonColumns.ownedBase.column)
  base: OwnedEntity;
}
