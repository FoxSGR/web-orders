import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, Min } from 'class-validator';

import { Id } from '../../common';
import { IShoeModelComponent } from './shoe-model-component.types';
import { ShoeComponent } from '../../shoe-component';
import { Color } from '../../color/color.entity';
import { OwnedEntity } from '../../common/entity';
import { ShoeModel } from '../shoe-model.entity';

@Entity()
export class ShoeModelComponent implements IShoeModelComponent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShoeModel, (model) => model.components)
  @JoinColumn({ name: 'modelId' })
  model: ShoeModel;

  @ManyToOne(() => ShoeComponent, { cascade: false, eager: true })
  component: ShoeComponent;

  @Min(0)
  @Column({ default: null })
  amount?: number;

  @Min(0)
  @Column({ default: null })
  price?: number;

  @ManyToOne(() => Color, { cascade: false, nullable: true, eager: true })
  @JoinColumn()
  color?: Color;

  @IsString()
  @Column({ default: '' })
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
