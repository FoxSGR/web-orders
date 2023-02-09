import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IShoeOrder, ShoeSizes } from './shoe-order.types';
import { ShoeSample } from '../shoe-sample';
import { ShoeModel } from '../shoe-model';
import { OwnedEntity } from '../common/entity';

@Entity()
export class ShoeOrder implements IShoeOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShoeSample, { cascade: false })
  @JoinColumn()
  sample: ShoeSample;

  @ManyToOne(() => ShoeModel, { cascade: false, nullable: false })
  @JoinColumn()
  model: ShoeModel;

  @Column({ default: null })
  dateAsked?: Date;

  @Column({ default: null })
  dateDelivery?: Date;

  @Column({ default: '' })
  notes?: string;

  @Column({ default: '{}', type: 'simple-json' })
  sizes: ShoeSizes;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
