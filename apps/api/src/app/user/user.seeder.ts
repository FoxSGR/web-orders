import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { environment } from '../../environments/environment';
import { User } from './user.entity';
import { EntitySeeder } from '../common/entity/entity.seeder';
import { hashPassword } from '../auth/auth';

@Injectable()
export class UserSeeder extends EntitySeeder<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(User, repository);
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

  protected identifier(): string {
    return 'email';
  }
}
