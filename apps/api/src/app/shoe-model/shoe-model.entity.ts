import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DataFactory, Factory } from 'nestjs-seeder';
import { Validate } from 'class-validator';

import { IShoeModel, ShoeModelType, shoeModelTypes } from './shoe-model.types';
import { IPhoto, SeasonType, seasonTypes } from '../shared';
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
  photos: IPhoto[];

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

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
