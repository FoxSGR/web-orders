import { Injectable } from '@nestjs/common';

import { EntityMapper } from '../common/entity/entity.mapper';
import { IClient } from './client.types';
import { ClientDTO } from './client.dto';
import { AddressMapper } from '../address';
import { IUser } from '../user';
import { Promial, ResponseFormat } from '../common';
import { AgentService } from '../agent/agent.service';
import { AgentMapper } from '../agent/agent.mapper';

@Injectable()
export class ClientMapper extends EntityMapper<IClient, ClientDTO> {
  constructor(
    private addressMapper: AddressMapper,
    private agentService: AgentService,
  ) {
    super();
  }

  async bodyToEntity(client: ClientDTO, user: IUser): Promial<IClient> {
    return {
      name: client.name,
      vat: client.vat,
      phoneNumber: client.phoneNumber,
      address: this.fieldToEntity(this.addressMapper, user, client.address),
      agent: await this.find(this.agentService, user, client.agent?.id),
    };
  }

  entityToResponse(client: IClient, type?: ResponseFormat): Partial<ClientDTO> {
    // no need to list the client's agents
    if (client.agent) {
      delete client.agent.clients;
    }

    let agent = undefined;
    let address = undefined;
    if (type === 'full') {
      const agentMapper = new AgentMapper(this, this.addressMapper); // cannot inject because they depend on each other
      agent = this.fieldToResponse(agentMapper, client.agent);
      address = this.fieldToResponse(this.addressMapper, client.address);
    }

    return {
      name: client.name,
      phoneNumber: client.phoneNumber,
      vat: client.vat,
      address,
      agent,
      ...super.entityToResponse(client),
    };
  }
}
