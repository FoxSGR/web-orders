import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Id } from '@web-orders/api-interfaces';
import { EntityService } from '../shared/entity';
import { Client } from './client.entity';
import { ClientRepository } from './client.repository';
import { FindParams, Page } from '../shared';
import { BrandService } from '../brand/brand.service';
import { Brand } from '../brand/brand.entity';
import { IUser } from '../user';

@Injectable()
export class ClientService extends EntityService<Client> {
  constructor(
    connection: Connection,
    @Inject(forwardRef(() => BrandService)) private brandService: BrandService,
  ) {
    super(connection, ClientRepository, {
      name: 'client',
      relations: ['address', 'agent', 'brands'],
      mapping: {
        name: {
          prop: 'name',
        },
        phoneNumber: {
          prop: 'phoneNumber',
        },
        'agent.name': {
          prop: 'agent.name',
        },
        'brands.name': {
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
    entity: Partial<Client>,
    user?: IUser,
  ): Promise<Client> {
    const found = await this.findOne(id, user, true);
    if (entity.address && found?.address) {
      entity.address.id = found.address.id;
    }

    return super.update(id, entity, user);
  }

  async findBrands(
    clientId: Id,
    params: FindParams<Client>,
  ): Promise<Page<Brand>> {
    if (!params.filter) {
      params.filter = [];
    }

    const page = await this.brandService.findPage(
      {
        ...params,
        loadRelations: true,
      },
      [
        {
          prop: 'clients.id',
          type: 'equals',
          value: clientId,
        },
        {
          prop: 'scope',
          type: 'equals',
          value: 'universal',
          negate: true,
        },
      ],
    );

    page.extra = {
      universal: await this.brandService.findAll(
        {
          owner: params.owner,
          loadRelations: true,
        },
        [
          {
            prop: 'scope',
            value: 'universal',
            type: 'equals',
          },
        ],
      ),
    };

    return page;
  }
}
