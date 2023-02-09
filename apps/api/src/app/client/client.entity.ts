import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { IClient } from './client.types';
import { Agent } from '../agent/agent.entity';
import { Address } from '../address/address.entity';
import { OwnedEntity } from '../common/entity';

@Entity()
export class Client implements IClient {
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
  address: Address;

  @ManyToOne(() => Agent, (agent) => agent.clients, { cascade: false })
  @JoinColumn({ name: 'agentId' })
  agent: Agent;

  @Column({ default: '' })
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
