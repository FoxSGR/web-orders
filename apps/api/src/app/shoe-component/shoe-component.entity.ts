import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, Min, Validate } from 'class-validator';
import { Factory } from 'nestjs-seeder';

import {
  ComponentType,
  componentTypes,
  OrnamentType,
  ornamentTypes,
} from '@web-orders/api-interfaces';
import { IShoeComponent } from './shoe-component.types';
import { OwnedEntity } from '../shared/entity';
import { commonColumns } from '../shared/entity/common-columns';

@Entity()
export class ShoeComponent implements IShoeComponent {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Validate(type => componentTypes.includes(type))
  @Factory(faker => faker.helpers.arrayElement(componentTypes))
  @Column({ type: 'enum', enum: componentTypes })
  type: ComponentType;

  @Validate(type => ornamentTypes.includes(type))
  @Factory(faker => faker.helpers.arrayElement(ornamentTypes))
  @Column({ type: 'enum', enum: ornamentTypes })
  ornamentType: OrnamentType;

  @IsNotEmpty()
  @Factory(faker =>
    faker.datatype.boolean() ? faker.random.alphaNumeric(5) : null,
  )
  @Column({ default: null })
  reference?: string;

  @IsNotEmpty()
  @Factory(faker => faker.commerce.product())
  @Column()
  name: string;

  @Min(0)
  @Factory(faker => faker.datatype.number(3) || null)
  @Column({ default: null })
  amount?: number;

  @Min(0)
  @Factory(faker => faker.datatype.number(10) || null)
  @Column({ default: null })
  price?: number;

  @IsString()
  @Factory(commonColumns.notes.seed)
  @Column(commonColumns.notes.column)
  notes?: string;

  @Factory(commonColumns.ownedBase.seed)
  @Column(() => OwnedEntity, commonColumns.ownedBase.column)
  base: OwnedEntity;
}
