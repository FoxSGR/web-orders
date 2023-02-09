import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { DataFactory, Factory } from 'nestjs-seeder';
import { IsNotEmpty, Validate } from 'class-validator';

import { IShoeModel, ShoeModelType, shoeModelTypes } from './shoe-model.types';
import { IPhoto, ISeason, SeasonType, seasonTypes } from '../common';
import { ShoeModelComponent } from './shoe-model-component/shoe-model-component.entity';
import { OwnedEntity } from '../common/entity';
import { commonColumns } from '../common/entity/common-columns';

export class Season implements ISeason {
  @Column()
  year: number;

  @IsNotEmpty()
  @Validate(type => seasonTypes.includes(type))
  @Column({ type: 'enum', enum: seasonTypes })
  seasons: SeasonType;
}

@Entity()
@Unique(['reference', 'owner', 'type'])
export class ShoeModel implements IShoeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Validate(type => shoeModelTypes.includes(type))
  @Factory(faker => faker.random.arrayElement(shoeModelTypes))
  @Column({ type: 'enum', enum: shoeModelTypes })
  type: ShoeModelType;

  @Factory(faker => faker.random.alphaNumeric(5))
  @Column({ default: null })
  reference?: string;

  @Column({ default: '[]', type: 'simple-json' })
  photos: IPhoto[];

  @Factory(faker =>
    DataFactory.createForClass(ShoeModelComponent).generate(
      faker.random.number(12),
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

  @Factory(faker => ({
    year: faker.random.number({ min: 2022, max: 2023 }),
    seasons: faker.random.arrayElement(seasonTypes),
  }))
  @Column(() => Season)
  season: Season;

  @Factory(commonColumns.notes.seed)
  @Column(commonColumns.notes.column)
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
