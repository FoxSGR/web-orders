import { EntityRepository } from 'typeorm';

import { WOEntityRepository } from '../shared/entity';
import { ShoeOrder } from './shoe-order.entity';

@EntityRepository(ShoeOrder)
export class ShoeOrderRepository extends WOEntityRepository<ShoeOrder> {}
