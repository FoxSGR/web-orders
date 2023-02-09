import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Id } from '@web-orders/api-interfaces';
import { EntityService } from '../shared/entity';
import { ShoeSample } from './shoe-sample.entity';
import type { IUser } from '../user';
import { FindParams } from '../shared';
import { Client, ClientService, IClient } from '../client';
import { ShoeSampleRepository } from './shoe-sample.repository';
import { ShoeModelService } from '../shoe-model';

@Injectable()
export class ShoeSampleService extends EntityService<ShoeSample> {
  constructor(
    connection: Connection,
    private clientService: ClientService,
    private shoeModelService: ShoeModelService,
  ) {
    super(connection, ShoeSampleRepository, {
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
        'sampleModel.components.component.reference': {
          prop: 'sampleModel.components.component.reference',
        },
        'sampleModel.components.component.name': {
          prop: 'sampleModel.components.component.name',
        },
      },
    });
  }

  async save(
    entity: Partial<ShoeSample>,
    id?: Id,
    user?: IUser,
  ): Promise<ShoeSample> {
    if (entity.sampleModel) {
      entity.sampleModel.type = 'sample';
      entity.sampleModel = await this.shoeModelService.save(
        entity.sampleModel,
        undefined,
        user,
      );
    }
    if (entity.baseModel) {
      entity.baseModel.type = 'base';
    }

    return super.save(entity, id, user);
  }

  protected async update(
    id: Id,
    entity: Partial<ShoeSample>,
    user?: IUser,
  ): Promise<ShoeSample> {
    const found = await this.findOne(id, user, true);
    if (entity.sampleModel && found?.sampleModel) {
      entity.sampleModel.id = found.sampleModel.id;
    }

    return super.update(id, entity, user);
  }

  async topClients(params: FindParams<IClient>, user: IUser) {
    const queryBuilder = this.repository
      .createQueryBuilder()
      .select('sample.client as clientId, count(*) as count')
      .from(ShoeSample, 'sample')
      .where('sample.owner = :owner', { owner: user.id });

    if (params.filter) {
      queryBuilder.innerJoin(Client, 'client');
      this.clientService.applyFilterToQueryBuilder(queryBuilder, params.filter);
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

  async mapFoundEntities(
    entities: ShoeSample[],
    params: FindParams<ShoeSample>,
  ): Promise<void> {
    await super.mapFoundEntities(entities, params);
    await this.shoeModelService.mapFoundEntities(
      entities.filter(e => e.sampleModel).map(e => e.sampleModel),
      params,
    );
    await this.shoeModelService.mapFoundEntities(
      entities.filter(e => e.baseModel).map(e => e.baseModel),
      params,
    );
  }
}
