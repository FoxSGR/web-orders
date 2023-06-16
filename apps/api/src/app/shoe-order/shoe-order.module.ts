import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoeOrderController } from './shoe-order.controller';
import { ShoeOrderService } from './shoe-order.service';
import { ShoeOrderSeeder } from './shoe-order.seeder';
import { ShoeOrderMapper } from './shoe-order.mapper';
import { ShoeOrderRepository } from './shoe-order.repository';
import { ShoeOrderSample } from './shoe-order-sample/shoe-order-sample.entity';

import { ShoeSampleModule } from '../shoe-sample';

@Module({
  controllers: [ShoeOrderController],
  imports: [TypeOrmModule.forFeature([ShoeOrderSample]), ShoeSampleModule],
  exports: [ShoeOrderService, ShoeOrderMapper],
  providers: [
    ShoeOrderRepository,
    ShoeOrderService,
    ShoeOrderSeeder,
    ShoeOrderMapper,
  ],
})
export class ShoeOrderModule {}
