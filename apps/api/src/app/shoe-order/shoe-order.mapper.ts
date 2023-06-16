import { Injectable } from '@nestjs/common';

import { IShoeOrderSampleDTO } from '@web-orders/api-interfaces';
import { Promial, ResponseFormat } from '../shared';
import { ShoeSampleMapper } from '../shoe-sample/shoe-sample.mapper';
import { IShoeSample, ShoeSampleService } from '../shoe-sample';
import { ShoeOrderDTO } from './shoe-order.dto';
import { IUser } from '../user';
import { IShoeOrder } from './shoe-order.types';
import { EntityMapper } from '../shared/entity/entity.mapper';
import { IShoeOrderSample } from './shoe-order-sample';

@Injectable()
export class ShoeOrderMapper extends EntityMapper<IShoeOrder, ShoeOrderDTO> {
  constructor(
    private sampleMapper: ShoeSampleMapper,
    private sampleService: ShoeSampleService,
  ) {
    super();
  }

  async bodyToEntity(
    body: Partial<ShoeOrderDTO>,
    user: IUser,
  ): Promial<IShoeOrder> {
    return {
      samples: await this.mapSamplesToEntities(body.samples, user),
      dateAsked: body.dateAsked,
      dateDelivery: body.dateDelivery,
      notes: body.notes,
    };
  }

  entityToResponse(
    order: IShoeOrder,
    type?: ResponseFormat,
  ): Partial<ShoeOrderDTO> {
    return {
      ...super.entityToResponse(order),
      samples: order.samples?.map(s => ({
        sample: this.fieldToResponse(this.sampleMapper, s.sample, type),
        sizes: s.sizes,
      })),
      dateAsked: order.dateAsked,
      dateDelivery: order.dateDelivery,
      notes: order.notes,
      totalPairs: order.totalPairs,
    };
  }

  private async mapSamplesToEntities(
    bodySamples: IShoeOrderSampleDTO[] | undefined,
    user: IUser,
  ): Promise<IShoeOrderSample[] | undefined> {
    if (!bodySamples) {
      return undefined;
    }

    const samples = await this.sampleService.findByIds(
      { owner: user },
      bodySamples.map(s => s.sample.id),
    );
    return bodySamples.map(bodySample => {
      return {
        sample: samples.find(s => s.id === bodySample.sample.id),
        sizes: bodySample.sizes,
      };
    });
  }
}
