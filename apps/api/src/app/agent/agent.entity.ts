import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { IAgent } from './agent.types';
import { Client } from '../client/client.entity';
import { Address } from '../address/address.entity';
import { OwnedEntity } from '../common/entity/entity';

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
  @OneToMany(() => Client, client => client.agent)
  clients?: Client[];

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
