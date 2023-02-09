import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Factory } from 'nestjs-seeder';

import { IColor } from './color.types';
import { OwnedEntity } from '../common/entity';

@Entity()
export class Color implements IColor {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Factory(faker => faker.commerce.color())
  @Column()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(255)
  @Factory(faker => faker.random.number(255))
  @Column({ precision: 3, default: null })
  red: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(255)
  @Factory(faker => faker.random.number(255))
  @Column({ precision: 3, default: null })
  green: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(255)
  @Factory(faker => faker.random.number(255))
  @Column({ precision: 3, default: null })
  blue: number;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
