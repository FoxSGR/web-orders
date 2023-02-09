import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { EntityService } from '../shared/entity';
import { ShoeOrder } from './shoe-order.entity';
import { ShoeOrderRepository } from './shoe-order.repository';

@Injectable()
export class ShoeOrderService extends EntityService<ShoeOrder> {
  constructor(connection: Connection) {
    super(connection, ShoeOrderRepository, {
      name: 'shoe_order',
      relations: ['sample'],
    });
  }
}
