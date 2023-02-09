import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DataFactory, Factory } from 'nestjs-seeder';

import { IShoeSample } from './shoe-sample.types';
import { ShoeModel } from '../shoe-model';
import { Client } from '../client';
import { Agent } from '../agent';
import { Brand } from '../brand';
import { OwnedEntity } from '../shared/entity';
import { commonColumns } from '../shared/entity/common-columns';

@Entity()
export class ShoeSample implements IShoeSample {
  @PrimaryGeneratedColumn()
  id: number;

  @Factory(faker => ({ id: faker.datatype.number(99) + 1 }))
  @ManyToOne(() => ShoeModel, { cascade: false })
  @JoinColumn()
  baseModel: ShoeModel;

  @Factory(() => ({
    ...DataFactory.createForClass(ShoeModel).generate(1)[0],
    type: 'sample',
  }))
  @OneToOne(() => ShoeModel, { cascade: true })
  @JoinColumn()
  sampleModel: ShoeModel;

  @Factory(faker => ({ id: faker.datatype.number(99) + 1 }))
  @ManyToOne(() => Client, { cascade: false })
  @JoinColumn()
  client?: Client;

  @Factory(faker => ({ id: faker.datatype.number(99) + 1 }))
  @ManyToOne(() => Agent)
  @JoinColumn()
  agent?: Agent;

  @Factory(faker => ({ id: faker.datatype.number(99) + 1 }))
  @ManyToOne(() => Brand)
  @JoinColumn()
  brand?: Brand;

  @Factory(faker => faker.date.recent())
  @Column({ default: null })
  dateAsked?: Date;

  @Factory(faker => faker.date.future())
  @Column({ default: null })
  deadline?: Date;

  @Column({ default: null })
  dateDelivery?: Date;

  @Factory(faker => faker.datatype.number({ min: 36, max: 45 }))
  @Column({ default: null })
  size?: number;

  @Factory(faker => faker.datatype.number({ min: 1, max: 5 }))
  @Column({ default: 1 })
  amount?: number;

  @Factory(commonColumns.notes.seed)
  @Column(commonColumns.notes.column)
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
