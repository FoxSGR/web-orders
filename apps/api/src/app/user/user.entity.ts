import { Exclude } from 'class-transformer';
import { IsArray, IsNotEmpty, Validate, ValidateNested } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Factory } from 'nestjs-seeder';

import { Role, roles } from '@web-orders/api-interfaces';
import type { IUser } from './user.types';
import { EntityBase } from '../shared/entity/entity';
import { Client } from '../client/client.entity';
import { hashPassword } from '../auth/auth';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Factory(faker => faker.name.firstName())
  @Column()
  firstName: string;

  @IsNotEmpty()
  @Factory(faker => faker.name.lastName())
  @Column()
  lastName: string;

  @IsNotEmpty()
  @Factory(faker => faker.internet.email())
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @Column()
  @Factory(() => hashPassword('password'))
  @Exclude()
  password: string;

  @IsNotEmpty()
  @Column()
  resourcesFolder: string;

  @Column({ type: 'simple-json' })
  @Factory(() => ['normal'])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Validate((role: string) => !!roles[role])
  roles: Role[];

  @Column(() => EntityBase, { prefix: '' })
  base: EntityBase;

  @OneToMany(() => Client, client => client.id)
  clients: Promise<Client[]>;

  toString(): string {
    return `${this.firstName} ${this.lastName} (${this.email})`;
  }
}
