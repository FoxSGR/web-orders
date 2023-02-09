import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IsNotEmpty, Validate } from 'class-validator';

import { IShoeModel, ShoeModelType, shoeModelTypes } from './shoe-model.types';
import { IPhoto, ISeason, SeasonType, seasonTypes } from '../common';
import { ShoeModelComponent } from './shoe-model-component/shoe-model-component.entity';
import { OwnedEntity } from '../common/entity';

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
  @Column({ type: 'enum', enum: shoeModelTypes })
  type: ShoeModelType;

  @Column({ default: null })
  reference?: string;

  @Column({ default: '[]', type: 'simple-json' })
  photos: IPhoto[];

  @OneToMany(() => ShoeModelComponent, component => component.model, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  @JoinTable()
  components: ShoeModelComponent[];

  @Column({ default: null })
  dateCreated?: Date;

  @Column(() => Season)
  season: Season;

  @Column({ default: '' })
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
