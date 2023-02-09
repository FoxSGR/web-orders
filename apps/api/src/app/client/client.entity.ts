import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { DataFactory, Factory } from 'nestjs-seeder';
import { IsNotEmpty } from 'class-validator';

import { IClient } from './client.types';
import { Agent } from '../agent/agent.entity';
import { Address } from '../address/address.entity';
import { OwnedEntity } from '../common/entity';
import { commonColumns } from '../common/entity/common-columns';

@Entity()
export class Client implements IClient {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Factory(faker => `${faker.name.firstName()} ${faker.name.lastName()}`)
  @Column()
  name: string;

  @Factory(faker => `${faker.phone.phoneNumber()}`)
  @Column({ default: null })
  phoneNumber?: string;

  @Column({ default: null })
  vat?: string;

  @Factory(() => DataFactory.createForClass(Address).generate(1)[0])
  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  address: Address;

  @Factory(() => DataFactory.createForClass(Agent).generate(1)[0])
  @ManyToOne(() => Agent, agent => agent.clients, { cascade: false })
  @JoinColumn({ name: 'agentId' })
  agent: Agent;

  @Factory(commonColumns.notes.seed)
  @Column(commonColumns.notes.column)
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
