import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoeOrderController } from './shoe-order.controller';
import { ShoeOrder } from './shoe-order.entity';
import { ShoeOrderService } from './shoe-order.service';
import { ShoeOrderMapper } from './shoe-order.mapper';

import { ShoeSampleModule } from '../shoe-sample';

@Module({
  controllers: [ShoeOrderController],
  imports: [TypeOrmModule.forFeature([ShoeOrder]), ShoeSampleModule],
  exports: [ShoeOrderService, ShoeOrderMapper],
  providers: [ShoeOrderService, ShoeOrderMapper],
})
export class ShoeOrderModule {}
