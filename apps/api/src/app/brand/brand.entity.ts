import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

import { IBrand } from './brand.types';
import { OwnedEntity } from '../common/entity/entity';

@Entity()
export class Brand implements IBrand {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
