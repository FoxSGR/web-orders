import { ValidateIf } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Factory } from 'nestjs-seeder';

import { countries } from '@web-orders/api-interfaces';
import { IAddress } from './address.types';
import { EntityBase } from '../common/entity/entity';

@Entity()
export class Address implements IAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Factory(faker => faker.address.streetAddress(false))
  @Column({ default: null })
  line1: string;

  @Column({ default: null })
  line2: string;

  @Factory(faker => faker.address.city())
  @Column({ default: null })
  city: string;

  @Factory(faker => faker.address.zipCode())
  @Column({ default: null })
  zipCode: string;

  @ValidateIf((country: string) => (country ? !!countries[country] : true))
  @Factory(faker => faker.address.countryCode())
  @Column({ default: null })
  country: string;

  @Column(() => EntityBase, { prefix: '' })
  base: EntityBase;
}
