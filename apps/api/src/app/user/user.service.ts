import { Injectable } from '@nestjs/common';

import { EntityService } from '../shared/entity/entity.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Connection } from 'typeorm';

@Injectable()
export class UserService extends EntityService<User> {
  constructor(connection: Connection) {
    super(connection, UserRepository, { name: 'user', owned: false });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
  }
}
