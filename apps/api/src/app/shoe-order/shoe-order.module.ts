import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoeOrder } from './shoe-order.entity';
import { ShoeOrderController } from './shoe-order.controller';
import { ShoeOrderService } from './shoe-order.service';
import { ShoeOrderSeeder } from './shoe-order.seeder';
import { ShoeOrderMapper } from './shoe-order.mapper';
import { ShoeOrderRepository } from './shoe-order.repository';

import { ShoeSampleModule } from '../shoe-sample';

@Module({
  controllers: [ShoeOrderController],
  imports: [TypeOrmModule.forFeature([ShoeOrder]), ShoeSampleModule],
  exports: [ShoeOrderService, ShoeOrderMapper],
  providers: [
    ShoeOrderRepository,
    ShoeOrderService,
    ShoeOrderSeeder,
    ShoeOrderMapper,
  ],
})
export class ShoeOrderModule {}
