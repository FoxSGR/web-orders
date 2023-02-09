import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { IAgent } from './agent.types';
import { Client } from '../client';
import { Address } from '../common/address';
import { OwnedEntity } from '../common/entity';

@Entity()
export class Agent implements IAgent {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @Column({ default: null })
  phoneNumber?: string;

  @Column({ default: null })
  vat?: string;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address?: Address;

  // not persisted
  clients?: Client[];

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
