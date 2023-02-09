import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EntityService } from '../common/entity';
import { Client } from './client.entity';

@Injectable()
export class ClientService extends EntityService<Client> {
  constructor(@InjectRepository(Client) clientRepository: Repository<Client>) {
    super(clientRepository, {
      name: 'client',
      relations: ['address', 'agent'],
    });
  }
}
