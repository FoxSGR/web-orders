import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { DataFactory, Factory } from 'nestjs-seeder';
import { IsNotEmpty } from 'class-validator';

import { IClient } from './client.types';
import { Agent } from '../agent/agent.entity';
import { Address } from '../address/address.entity';
import { Brand } from '../brand/brand.entity';
import { OwnedEntity } from '../shared/entity';
import { commonColumns } from '../shared/entity/common-columns';

@Entity()
export class Client implements IClient {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Factory(faker => `${faker.name.firstName()} ${faker.name.lastName()}`)
  @Column()
  name: string;

  @Factory(faker => `${faker.phone.number('#########')}`)
  @Column({ default: null })
  phoneNumber?: string;

  @Column({ default: null })
  vat?: string;

  @Factory(() => DataFactory.createForClass(Address).generate(1)[0])
  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  address: Address;

  @Factory(faker => ({ id: faker.datatype.number(99) + 1 }))
  @ManyToOne(() => Agent, agent => agent.clients, { cascade: false })
  @JoinColumn({ name: 'agentId' })
  agent: Agent;

  @Factory(faker => [{ id: faker.datatype.number(100) + 1 }])
  @ManyToMany(() => Brand, brand => brand.clients)
  @JoinTable()
  brands: Brand[];

  @Factory(commonColumns.notes.seed)
  @Column(commonColumns.notes.column)
  notes?: string;

  @Factory(commonColumns.ownedBase.seed)
  @Column(() => OwnedEntity, commonColumns.ownedBase.column)
  base: OwnedEntity;
}
