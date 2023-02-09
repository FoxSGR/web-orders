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

  @Factory(() => DataFactory.createForClass(Address))
  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address: Address;

  @Factory(() => DataFactory.createForClass(Agent))
  @ManyToOne(() => Agent, agent => agent.clients, { cascade: false })
  @JoinColumn({ name: 'agentId' })
  agent: Agent;

  @Factory(faker => faker.lorem.slug(faker.random.number({ min: 0, max: 32 })))
  @Column({ default: '' })
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
