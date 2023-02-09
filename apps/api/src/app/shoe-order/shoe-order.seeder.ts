import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { ShoeOrder } from './shoe-order.entity';
import { ShoeOrderRepository } from './shoe-order.repository';
import { ShoeOrderService } from './shoe-order.service';
import { EntitySeeder } from '../shared/entity';
import { EntitySeederService } from '../shared';

@Injectable()
@EntitySeederService({ order: 16000 })
export class ShoeOrderSeeder extends EntitySeeder<ShoeOrder> {
  constructor(connection: Connection, shoeComponentService: ShoeOrderService) {
    super(ShoeOrder, shoeComponentService, connection, ShoeOrderRepository);
  }

  protected identifier(): string {
    return 'sample.sampleModel.id';
  }
}
