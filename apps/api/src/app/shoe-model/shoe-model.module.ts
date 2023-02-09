import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColorModule } from '../color';
import { ShoeComponentModule } from '../shoe-component';

import { ShoeModelController } from './shoe-model.controller';
import { ShoeModel } from './shoe-model.entity';
import { ShoeModelMapper } from './shoe-model.mapper';
import { ShoeModelService } from './shoe-model.service';
import { ShoeModelComponent } from './shoe-model-component';
import { ShoeModelSeeder } from './shoe-model.seeder';

@Module({
  controllers: [ShoeModelController],
  imports: [
    TypeOrmModule.forFeature([ShoeModel, ShoeModelComponent]),
    ColorModule,
    ShoeComponentModule,
  ],
  exports: [ShoeModelMapper, ShoeModelService],
  providers: [ShoeModelMapper, ShoeModelSeeder, ShoeModelService],
})
export class ShoeModelModule {}
