import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EntityService } from '../common/entity';
import { ShoeOrder } from './shoe-order.entity';

@Injectable()
export class ShoeOrderService extends EntityService<ShoeOrder> {
  constructor(@InjectRepository(ShoeOrder) repository: Repository<ShoeOrder>) {
    super(repository, {
      name: 'shoe_order',
      relations: ['sample'],
    });
  }
}
