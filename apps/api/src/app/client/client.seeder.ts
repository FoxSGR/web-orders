import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from './client.entity';
import { EntitySeeder } from '../common/entity';
import { EntitySeederService } from '../common';

@Injectable()
@EntitySeederService()
export class ClientSeeder extends EntitySeeder<Client> {
  constructor(@InjectRepository(Client) repository: Repository<Client>) {
    super(Client, repository);
  }

  protected identifier(): keyof Client {
    return 'name';
  }
}
