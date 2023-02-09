import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Factory } from 'nestjs-seeder';
import { IsNotEmpty, IsString } from 'class-validator';

import { IBrand } from './brand.types';
import { OwnedEntity } from '../common/entity';

@Entity()
export class Brand implements IBrand {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Factory(faker => faker.commerce.product())
  @Column()
  name: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
