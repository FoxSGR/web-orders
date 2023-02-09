import { ValidateIf } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { countries } from './countries';
import { IAddress } from './address.types';
import { EntityBase } from '../entity/base.entity';

@Entity()
export class Address implements IAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  line1: string;

  @Column({ default: null })
  line2: string;

  @Column({ default: null })
  city: string;

  @Column({ default: null })
  zipCode: string;

  @Column({ default: null })
  @ValidateIf((country: string) => (country ? !!countries[country] : true))
  country: string;

  @Column(() => EntityBase, { prefix: '' })
  base: EntityBase;
}
