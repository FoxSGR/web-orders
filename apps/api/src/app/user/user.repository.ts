import { EntityRepository } from 'typeorm';

import { WOEntityRepository } from '../shared/entity';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends WOEntityRepository<User> {}
