import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoeSampleController } from './shoe-sample.controller';
import { ShoeSampleMapper } from './shoe-sample.mapper';
import { ShoeSampleService } from './shoe-sample.service';
import { ShoeSampleSeeder } from './shoe-sample.seeder';
import { ShoeSampleRepository } from './shoe-sample.repository';

import { AgentModule } from '../agent';
import { BrandModule } from '../brand';
import { ClientModule } from '../client';
import { ShoeModelModule } from '../shoe-model';

@Module({
  controllers: [ShoeSampleController],
  imports: [
    TypeOrmModule.forFeature([ShoeSampleRepository]),
    AgentModule,
    BrandModule,
    ClientModule,
    ShoeModelModule,
  ],
  exports: [ShoeSampleMapper, ShoeSampleService],
  providers: [
    ShoeSampleRepository,
    ShoeSampleMapper,
    ShoeSampleSeeder,
    ShoeSampleService,
  ],
})
export class ShoeSampleModule {}
