import { WOEntityRepository } from '../shared/entity';
import { User } from './user.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends WOEntityRepository<User> {}
