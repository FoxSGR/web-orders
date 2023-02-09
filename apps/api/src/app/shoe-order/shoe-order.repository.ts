import { WOEntityRepository } from '../shared/entity';
import { ShoeOrder } from './shoe-order.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(ShoeOrder)
export class ShoeOrderRepository extends WOEntityRepository<ShoeOrder> {}
