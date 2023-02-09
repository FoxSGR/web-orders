import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Factory } from 'nestjs-seeder';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

import { BrandScope, brandScopes } from '@web-orders/api-interfaces';
import { IBrand } from './brand.types';
import { OwnedEntity } from '../shared/entity';
import { commonColumns } from '../shared/entity/common-columns';
import { Client } from '../client/client.entity';

@Entity()
export class Brand implements IBrand {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Factory(faker => faker.commerce.product() + ' ' + faker.commerce.product())
  @Column()
  name: string;

  @IsIn(brandScopes)
  @Factory(() => 'client')
  @Column({ default: 'client', type: 'enum', enum: brandScopes })
  scope: BrandScope;

  @Factory(commonColumns.notes.seed)
  @Column(commonColumns.notes.column)
  notes?: string;

  @ManyToMany(() => Client, client => client.brands)
  clients: Client[];

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
