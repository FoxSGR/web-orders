import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EntityService } from '../common/entity';
import { User } from './user.entity';

@Injectable()
export class UserService extends EntityService<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>
  ) {
    super(repository, { name: 'user', owned: false });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: {
        username: username.toLocaleLowerCase(),
      },
    });
  }
}
