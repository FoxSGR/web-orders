import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColorModule } from '../color';
import { ShoeComponentModule } from '../shoe-component';

import { ShoeModelController } from './shoe-model.controller';
import { ShoeModelMapper } from './shoe-model.mapper';
import { ShoeModelService } from './shoe-model.service';
import { ShoeModelComponent } from './shoe-model-component';
import { ShoeModelSeeder } from './shoe-model.seeder';
import { ShoeModelRepository } from './shoe-model.repository';

@Module({
  controllers: [ShoeModelController],
  imports: [
    TypeOrmModule.forFeature([ShoeModelRepository, ShoeModelComponent]),
    ColorModule,
    ShoeComponentModule,
  ],
  exports: [ShoeModelMapper, ShoeModelService],
  providers: [
    ShoeModelRepository,
    ShoeModelMapper,
    ShoeModelSeeder,
    ShoeModelService,
  ],
})
export class ShoeModelModule {}
