import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { EntityService } from '../shared/entity';
import { FindParams } from '../shared';
import { ShoeOrder } from './shoe-order.entity';
import { ShoeOrderRepository } from './shoe-order.repository';
import { ShoeSampleService } from '../shoe-sample';

@Injectable()
export class ShoeOrderService extends EntityService<
  ShoeOrder,
  ShoeOrderRepository
> {
  constructor(
    private shoeSampleService: ShoeSampleService,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef, ShoeOrderRepository, {
      name: 'shoe_order',
      mapping: {
        dateAsked: { prop: 'dateAsked' },
      },
    });
  }

  async mapFoundEntities(
    entities: ShoeOrder[],
    params: FindParams<ShoeOrder>,
  ): Promise<void> {
    await super.mapFoundEntities(entities, params);

    for (const order of entities) {
      const orderSamples = await this.repository.findOrderSamples(
        order.id,
        params.owner,
        this.shoeSampleService.buildRelations(),
      );

      await this.shoeSampleService.mapFoundEntities(
        orderSamples.map(s => s.sample),
        { owner: params.owner },
      );

      order.samples = orderSamples;
    }
  }
}
