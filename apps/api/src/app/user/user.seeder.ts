import { Injectable } from '@nestjs/common';
import { Connection, DeepPartial } from 'typeorm';

import { environment } from '../../environments/environment';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { hashPassword } from '../auth/auth';
import { EntitySeeder } from '../shared/entity';
import { EntitySeederService } from '../shared';

@Injectable()
@EntitySeederService({ order: 50 })
export class UserSeeder extends EntitySeeder<User> {
  constructor(connection: Connection, userService: UserService) {
    super(User, userService, connection, UserRepository);
  }

  protected async constant(): Promise<DeepPartial<User>[]> {
    return [
      {
        firstName: 'Luís',
        lastName: 'Pinho',
        roles: ['admin'],
        email: environment.admin.email,
        password: await hashPassword(environment.admin.password),
      },
    ];
  }

  protected identifier = () => 'email' as keyof User;
}
