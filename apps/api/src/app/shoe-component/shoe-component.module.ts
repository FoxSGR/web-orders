import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoeComponentController } from './shoe-component.controller';
import { ShoeComponentMapper } from './shoe-component.mapper';
import { ShoeComponentSeeder } from './shoe-component.seeder';
import { ShoeComponentService } from './shoe-component.service';
import { ShoeComponentRepository } from './shoe-component.repository';

@Module({
  controllers: [ShoeComponentController],
  imports: [TypeOrmModule.forFeature([ShoeComponentRepository])],
  exports: [ShoeComponentMapper, ShoeComponentService],
  providers: [
    ShoeComponentRepository,
    ShoeComponentMapper,
    ShoeComponentSeeder,
    ShoeComponentService,
  ],
})
export class ShoeComponentModule {}
