import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Factory } from 'nestjs-seeder';

import { IColor } from './color.types';
import { OwnedEntity } from '../shared/entity';
import { commonColumns } from '../shared/entity/common-columns';

@Entity()
export class Color implements IColor {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Factory(faker => faker.color.human())
  @Column()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Factory(faker => faker.color.rgb({ format: 'hex' }))
  @Column({ precision: 3, default: null })
  color: string;

  @Factory(commonColumns.ownedBase.seed)
  @Column(() => OwnedEntity, commonColumns.ownedBase.column)
  base: OwnedEntity;
}
