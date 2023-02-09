import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Factory } from 'nestjs-seeder';
import { IsString, Min } from 'class-validator';

import { Id } from '@web-orders/api-interfaces';
import { IShoeModelComponent } from './shoe-model-component.types';
import { ShoeComponent } from '../../shoe-component';
import { Color } from '../../color/color.entity';
import { OwnedEntity } from '../../common/entity';
import { ShoeModel } from '../shoe-model.entity';
import { commonColumns } from '../../common/entity/common-columns';

@Entity()
export class ShoeModelComponent implements IShoeModelComponent {
  @PrimaryGeneratedColumn()
  id: Id;

  @ManyToOne(() => ShoeModel, model => model.components)
  @JoinColumn({ name: 'modelId' })
  model: ShoeModel;

  @Factory(faker => ({ id: faker.random.number(9) + 1 }))
  @ManyToOne(() => ShoeComponent, { cascade: false, eager: true })
  component: ShoeComponent;

  @Min(0)
  @Factory(faker => faker.random.number(3))
  @Column({ default: null })
  amount?: number;

  @Min(0)
  @Factory(faker => faker.random.number(32))
  @Column({ default: null })
  price?: number;

  @Factory(faker => ({ id: faker.random.number(9) + 1 }))
  @ManyToOne(() => Color, { cascade: false, nullable: true, eager: true })
  @JoinColumn()
  color?: Color;

  @IsString()
  @Factory(commonColumns.notes.seed)
  @Column(commonColumns.notes.column)
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
