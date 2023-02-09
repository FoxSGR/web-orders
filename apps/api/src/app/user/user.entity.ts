import { Exclude } from 'class-transformer';
import { IsArray, IsNotEmpty, Validate, ValidateNested } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IUser } from './user.types';
import { Role, roles } from './roles';
import { EntityBase } from '../common/entity';
import { Client } from '../client/client.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ name: 'first_name' })
  firstName: string;

  @IsNotEmpty()
  @Column({ name: 'last_name' })
  lastName: string;

  @IsNotEmpty()
  @Column()
  email: string;

  @IsNotEmpty()
  @Column()
  username: string;

  @IsNotEmpty()
  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'simple-json' })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Validate((role) => !!roles[role])
  roles: Role[];

  @Column(() => EntityBase, { prefix: '' })
  base: EntityBase;

  @OneToMany(() => Client, (client) => client.id)
  clients: Promise<Client[]>;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await User.hashPassword(this.password);
  }

  toString(): string {
    return `${this.firstName} ${this.lastName} (${this.email})`;
  }

  static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve('test');
      // void bcrypt.hash(password, 10, (err, hash) => {
      //   if (err) {
      //     return reject(err);
      //   }
      //   resolve(hash);
      // });
    });
  }
}
