import { DeepPartial } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { AddressMapper } from '../address';
import { IAgent } from './agent.types';
import { EntityMapper } from '../shared/entity/entity.mapper';
import { AgentDTO } from './agent.dto';
import { ClientMapper } from '../client/client.mapper';
import { IUser } from '../user';
import { ResponseFormat } from '../shared';

@Injectable()
export class AgentMapper extends EntityMapper<IAgent, AgentDTO> {
  constructor(
    @Inject(forwardRef(() => ClientMapper))
    private clientMapper: ClientMapper,
    private addressMapper: AddressMapper,
  ) {
    super();
  }

  bodyToEntity(body: AgentDTO, user: IUser): DeepPartial<IAgent> {
    return {
      name: body.name,
      phoneNumber: body.phoneNumber,
      address: this.fieldToEntity(this.addressMapper, user, body.address),
    };
  }

  entityToResponse(agent: IAgent, type?: ResponseFormat): Partial<AgentDTO> {
    // prevent overflow
    agent.clients?.forEach(client => delete client.agent);

    return {
      name: agent.name,
      clients: this.fieldToResponse(this.clientMapper, agent.clients, type),
      address: this.fieldToResponse(this.addressMapper, agent.address),
      ...super.entityToResponse(agent),
    };
  }
}
