import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

import { EntityService } from '../shared/entity/entity.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Connection } from 'typeorm';
import { IUser } from './user.types';

@Injectable()
export class UserService extends EntityService<User> {
  constructor(connection: Connection) {
    super(connection, UserRepository, { name: 'user', owned: false });
  }

  protected async create(entity: Partial<User>, user?: IUser): Promise<User> {
    entity.resourcesFolder = uuid.v4().replace(/-/g, '');
    return super.create(entity, user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
  }
}
