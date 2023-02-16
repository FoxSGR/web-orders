import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

import { environment } from '../../environments/environment';

import { EntityService } from '../shared/entity/entity.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Connection } from 'typeorm';
import { IUser } from './user.types';
import { hashPassword } from '../auth/auth';

@Injectable()
export class UserService extends EntityService<User> {
  constructor(connection: Connection) {
    super(connection, UserRepository, { name: 'user', owned: false });
  }

  /**
   * Creates a user.
   * @param entity
   * @param user
   * @protected
   */
  protected async create(entity: Partial<User>, user?: IUser): Promise<User> {
    entity.resourcesFolder = uuid.v4().replace(/-/g, '');
    return super.create(entity, user);
  }

  /**
   * Finds a user by email.
   * @param email
   */
  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  /**
   * Checks if the admin user exists and creates it if it doesn't.
   */
  async checkAdmin() {
    const count = await this.count({}, [
      { prop: 'email', type: 'equals', value: environment.admin.email },
    ]);
    if (count === 0) {
      await this.save({
        firstName: 'Admin',
        lastName: 'Silva',
        email: environment.admin.email,
        password: await hashPassword(environment.admin.password),
        roles: ['admin'],
      });
    }
  }
}
