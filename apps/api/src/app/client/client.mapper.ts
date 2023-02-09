import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { EntityMapper } from '../common/entity/entity.mapper';
import { IClient } from './client.types';
import { ClientDTO } from './client.dto';
import { AddressMapper } from '../address';
import { IUser } from '../user';
import { Promial } from '../common';
import { AgentService } from '../agent/agent.service';
import { AgentMapper } from '../agent/agent.mapper';

@Injectable()
export class ClientMapper extends EntityMapper<IClient, ClientDTO> {
  constructor(
    @Inject(forwardRef(() => ClientMapper))
    private addressMapper: AddressMapper,
    private agentService: AgentService
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

  entityToResponse(client: IClient): Partial<ClientDTO> {
    // no need to list the client's agents
    if (client.agent) {
      delete client.agent.clients;
    }

    const agentMapper = new AgentMapper(this, this.addressMapper); // cannot inject because they depend on each other
    return {
      ...super.entityToResponse(client),
      address: this.fieldToResponse(this.addressMapper, client.address),
      name: client.name,
      phoneNumber: client.phoneNumber,
      vat: client.vat,
      agent: this.fieldToResponse(agentMapper, client.agent),
    };
  }
}
