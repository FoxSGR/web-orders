import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EntityService } from '../common/entity';
import { ShoeSample } from './shoe-sample.entity';
import type { IUser } from '../user';
import { FindParams } from '../common';
import { Client, ClientService, IClient } from '../client';

@Injectable()
export class ShoeSampleService extends EntityService<ShoeSample> {
  constructor(
    @InjectRepository(ShoeSample) shoeSampleRepository: Repository<ShoeSample>,
    private clientService: ClientService,
  ) {
    super(shoeSampleRepository, {
      name: 'shoe_sample',
      relations: [
        'baseModel',
        'sampleModel',
        'baseModel.components',
        'sampleModel.components',
        'sampleModel.components.component',
        'client',
        'agent',
        'brand',
      ],
      mapping: {
        'sampleModel.reference': {
          prop: 'sampleModel.reference',
        },
        'client.name': {
          prop: 'client.name',
        },
        'agent.name': {
          prop: 'agent.name',
        },
        'brand.name': {
          prop: 'brand.name',
        },
        notes: {
          prop: 'notes',
        },
        'components.component.reference': {
          prop: 'sampleModel.components.component.reference',
        },
        'components.component.name': {
          prop: 'sampleModel.components.component.name',
        },
      },
    });
  }

  async create(entity: Partial<ShoeSample>, user: IUser): Promise<ShoeSample> {
    entity.sampleModel.type = 'sample';
    return super.create(entity, user);
  }

  async topClients(params: FindParams<IClient>, user: IUser) {
    let queryBuilder = this.repository
      .createQueryBuilder()
      .select('sample.client as clientId, count(*) as count')
      .from(ShoeSample, 'sample')
      .where('sample.owner = :owner', { owner: user.id });

    if (params.filter) {
      queryBuilder = queryBuilder.innerJoin(Client, 'client');
      queryBuilder = this.clientService.applyFilterToQueryBuilder(
        queryBuilder,
        params.filter,
        'client',
      );
    }

    const topClientsData = await queryBuilder
      .groupBy('sample.client')
      .orderBy('count(*)', 'DESC')
      .limit(params.limit || 50)
      .offset(params.offset || 0)
      .getRawMany();

    const clientIds = topClientsData.map(client => client.clientId);
    return this.clientService.findByIds(
      {
        owner: user,
        sortField: params.sortField || 'name',
        sortDirection: params.sortDirection || 'ASC',
      },
      clientIds,
    );
  }
}
