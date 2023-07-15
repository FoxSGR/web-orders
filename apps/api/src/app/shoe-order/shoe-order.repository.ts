import { EntityRepository } from 'typeorm';

import { Id } from '@web-orders/api-interfaces';
import { WOEntityRepository } from '../shared/entity';
import { ShoeOrder } from './shoe-order.entity';
import { ShoeOrderSample } from './shoe-order-sample';
import { IUser } from '../user';

@EntityRepository(ShoeOrder)
export class ShoeOrderRepository extends WOEntityRepository<ShoeOrder> {
  findOrderSamples(
    orderId: Id,
    user: IUser,
    relations: string[],
  ): Promise<ShoeOrderSample[]> {
    relations = relations.map(relation => `sample.${relation}`);

    const orderSampleRepository =
      this.manager.connection.getRepository(ShoeOrderSample);
    return orderSampleRepository.find({
      where: {
        order: orderId,
      },
      relations: ['sample', ...relations],
    });
  }
}
