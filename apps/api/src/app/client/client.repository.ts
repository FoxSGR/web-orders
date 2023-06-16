import { EntityRepository } from 'typeorm';

import { WOEntityRepository } from '../shared/entity';
import { Client } from './client.entity';

@EntityRepository(Client)
export class ClientRepository extends WOEntityRepository<Client> {}
