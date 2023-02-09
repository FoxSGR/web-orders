import { Injectable } from '@nestjs/common';

import { Promial, ResponseFormat } from '../shared';
import { ShoeSampleMapper } from '../shoe-sample/shoe-sample.mapper';
import { IShoeSample, ShoeSampleService } from '../shoe-sample';
import { ShoeOrderDTO } from './shoe-order.dto';
import { IUser } from '../user';
import { IShoeOrder } from './shoe-order.types';
import { EntityMapper } from '../shared/entity/entity.mapper';

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
    const sample: IShoeSample = await this.find(
      this.sampleService,
      user,
      body.sample?.id,
    );

    return {
      sample,
      model: sample?.sampleModel, // for now, the model is always the sample model
      dateAsked: body.dateAsked,
      dateDelivery: body.dateDelivery,
      notes: body.notes,
      sizes: body.sizes,
    };
  }

  entityToResponse(
    order: IShoeOrder,
    type?: ResponseFormat,
  ): Partial<ShoeOrderDTO> {
    return {
      ...super.entityToResponse(order),
      sample: this.fieldToResponse(this.sampleMapper, order.sample, type),
      dateAsked: order.dateAsked,
      dateDelivery: order.dateDelivery,
      notes: order.notes,
      sizes: order.sizes,
    };
  }
}
