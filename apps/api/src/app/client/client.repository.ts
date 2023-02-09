import { WOEntityRepository } from '../shared/entity';
import { Client } from './client.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Client)
export class ClientRepository extends WOEntityRepository<Client> {}
