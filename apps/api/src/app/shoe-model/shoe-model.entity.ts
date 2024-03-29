import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DataFactory, Factory } from 'nestjs-seeder';
import { Validate } from 'class-validator';

import { APIFile, SeasonType, seasonTypes } from '@web-orders/api-interfaces';
import { IShoeModel, ShoeModelType, shoeModelTypes } from './shoe-model.types';
import { ShoeModelComponent } from './shoe-model-component/shoe-model-component.entity';
import { OwnedEntity } from '../shared/entity';
import { commonColumns } from '../shared/entity/common-columns';

@Entity()
export class ShoeModel implements IShoeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Validate(type => shoeModelTypes.includes(type))
  @Factory(faker => faker.helpers.arrayElement(shoeModelTypes))
  @Column({ type: 'enum', enum: shoeModelTypes })
  type: ShoeModelType;

  @Factory(faker => faker.random.alphaNumeric(5))
  @Column({ default: null })
  reference?: string;

  @Column({ default: '[]', type: 'simple-json' })
  photos: APIFile[];

  @Factory(faker =>
    DataFactory.createForClass(ShoeModelComponent).generate(
      faker.datatype.number(12),
    ),
  )
  @OneToMany(() => ShoeModelComponent, component => component.model, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  @JoinTable()
  components: ShoeModelComponent[];

  @Factory(faker => faker.date.recent())
  @Column({ default: null })
  dateCreated?: Date;

  @Factory(faker => faker.helpers.arrayElement(seasonTypes))
  @Column({ default: null, type: 'enum', enum: seasonTypes })
  season: SeasonType;

  @Factory(commonColumns.notes.seed)
  @Column(commonColumns.notes.column)
  notes?: string;

  @Factory(commonColumns.ownedBase.seed)
  @Column(() => OwnedEntity, commonColumns.ownedBase.column)
  base: OwnedEntity;
}
