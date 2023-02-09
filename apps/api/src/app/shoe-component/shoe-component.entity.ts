import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, Min, Validate } from 'class-validator';

import { ComponentType, componentTypes } from '@web-orders/api-interfaces';
import { IShoeComponent } from './shoe-component.types';
import { OwnedEntity } from '../common/entity';

@Entity()
export class ShoeComponent implements IShoeComponent {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Validate(type => componentTypes.includes(type))
  @Column({ type: 'enum', enum: componentTypes })
  type: ComponentType;

  @IsNotEmpty()
  @Column()
  name: string;

  @Min(0)
  @Column({ default: null })
  amount?: number;

  @Min(0)
  @Column({ default: null })
  price?: number;

  @IsString()
  @Column({ default: '' })
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
