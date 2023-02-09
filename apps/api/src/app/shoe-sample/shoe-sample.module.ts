import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoeSampleController } from './shoe-sample.controller';
import { ShoeSample } from './shoe-sample.entity';
import { ShoeSampleMapper } from './shoe-sample.mapper';
import { ShoeSampleService } from './shoe-sample.service';

import { AgentModule } from '../agent';
import { BrandModule } from '../brand';
import { ClientModule } from '../client';
import { ShoeModelModule } from '../shoe-model';
import { ShoeSampleSeeder } from './shoe-sample.seeder';

@Module({
  controllers: [ShoeSampleController],
  imports: [
    TypeOrmModule.forFeature([ShoeSample]),
    AgentModule,
    BrandModule,
    ClientModule,
    ShoeModelModule,
  ],
  exports: [ShoeSampleMapper, ShoeSampleService],
  providers: [ShoeSampleMapper, ShoeSampleSeeder, ShoeSampleService],
})
export class ShoeSampleModule {}
