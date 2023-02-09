import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoeComponentController } from './shoe-component.controller';
import { ShoeComponent } from './shoe-component.entity';
import { ShoeComponentMapper } from './shoe-component.mapper';
import { ShoeComponentService } from './shoe-component.service';

@Module({
  controllers: [ShoeComponentController],
  imports: [TypeOrmModule.forFeature([ShoeComponent])],
  exports: [ShoeComponentMapper, ShoeComponentService],
  providers: [ShoeComponentMapper, ShoeComponentService],
})
export class ShoeComponentModule {}
