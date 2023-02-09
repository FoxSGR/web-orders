import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { DataFactory, Factory } from 'nestjs-seeder';

import { IAgent } from './agent.types';
import { Client } from '../client/client.entity';
import { Address } from '../address/address.entity';
import { OwnedEntity } from '../common/entity/entity';
import { commonColumns } from '../common/entity/common-columns';

@Entity()
export class Agent implements IAgent {
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
  address?: Address;

  @OneToMany(() => Client, client => client.agent)
  clients?: Client[];

  @Factory(commonColumns.notes.seed)
  @Column(commonColumns.notes.column)
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
