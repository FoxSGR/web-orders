import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Id } from '@web-orders/api-interfaces';
import { EntityService } from '../shared/entity';
import { Agent } from './agent.entity';
import { AgentRepository } from './agent.repository';
import { IUser } from '../user';

@Injectable()
export class AgentService extends EntityService<Agent> {
  constructor(connection: Connection) {
    super(connection, AgentRepository, {
      name: 'agent',
      relations: ['address', 'clients', 'clients.brands'],
      mapping: {
        name: {
          prop: 'name',
        },
        phoneNumber: {
          prop: 'phoneNumber',
        },
        'clients.name': {
          prop: 'agent.name',
        },
        'clients.brands.name': {
          prop: 'brands.name',
        },
        notes: {
          prop: 'notes',
        },
      },
    });
  }

  protected async update(
    id: Id,
    entity: Partial<Agent>,
    user?: IUser,
  ): Promise<Agent> {
    const found = await this.findOne(id, user, true);
    if (entity.address && found?.address) {
      entity.address.id = found.address.id;
    }

    return super.update(id, entity, user);
  }
}
