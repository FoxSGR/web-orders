import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Client } from './client.entity';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';
import { EntitySeeder } from '../shared/entity';
import { EntitySeederService } from '../shared';

@Injectable()
@EntitySeederService({ order: 300 })
export class ClientSeeder extends EntitySeeder<Client> {
  constructor(connection: Connection, clientService: ClientService) {
    super(Client, clientService, connection, ClientRepository);
  }

  protected identifier = () => 'name' as keyof Client;
}
