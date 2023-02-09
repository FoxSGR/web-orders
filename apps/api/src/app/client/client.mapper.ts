import { Injectable } from '@nestjs/common';

import { EntityMapper } from '../shared/entity/entity.mapper';
import { IClient } from './client.types';
import { ClientDTO } from './client.dto';
import { AddressMapper } from '../address';
import { IUser } from '../user';
import { Promial, ResponseFormat } from '../shared';
import { AgentService } from '../agent/agent.service';
import { AgentMapper } from '../agent/agent.mapper';
import { BrandMapper } from '../brand/brand.mapper';
import { BrandService } from '../brand/brand.service';

@Injectable()
export class ClientMapper extends EntityMapper<IClient, ClientDTO> {
  constructor(
    private addressMapper: AddressMapper,
    private agentService: AgentService,
    private brandMapper: BrandMapper,
    private brandService: BrandService,
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
      brands: await this.find(
        this.brandService,
        user,
        client.brands?.map(b => b.id),
      ),
    };
  }

  entityToResponse(client: IClient, type?: ResponseFormat): Partial<ClientDTO> {
    // no need to list the client's agents
    if (client.agent) {
      delete client.agent.clients;
    }

    const full: Partial<ClientDTO> = {};

    if (client.agent) {
      const agentMapper = new AgentMapper(this, this.addressMapper); // cannot inject because they depend on each other
      full.agent = this.fieldToResponse(agentMapper, client.agent);
    }

    if (client.brands) {
      full.brands = this.fieldToResponse(this.brandMapper, client.brands, type);
    }

    return {
      name: client.name,
      phoneNumber: client.phoneNumber,
      vat: client.vat,
      address: this.fieldToResponse(this.addressMapper, client.address),
      ...full,
      ...super.entityToResponse(client),
    };
  }
}
