import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IShoeSample } from './shoe-sample.types';
import { ShoeModel } from '../shoe-model';
import { Client } from '../client';
import { Agent } from '../agent';
import { Brand } from '../brand';
import { OwnedEntity } from '../common/entity';

@Entity()
export class ShoeSample implements IShoeSample {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShoeModel, { cascade: false })
  @JoinColumn()
  baseModel: ShoeModel;

  @OneToOne(() => ShoeModel, { cascade: true })
  @JoinColumn()
  sampleModel: ShoeModel;

  @ManyToOne(() => Client, { cascade: false })
  @JoinColumn()
  client?: Client;

  @ManyToOne(() => Agent)
  @JoinColumn()
  agent?: Agent;

  @ManyToOne(() => Brand)
  @JoinColumn()
  brand?: Brand;

  @Column({ default: null })
  dateAsked?: Date;

  @Column({ default: null })
  dateDelivery?: Date;

  @Column({ default: '' })
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
