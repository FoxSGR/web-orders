import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Brand } from './brand.entity';
import { BrandController } from './brand.controller';
import { BrandMapper } from './brand.mapper';
import { BrandSeeder } from './brand.seeder';
import { BrandService } from './brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  exports: [BrandMapper, BrandService],
  providers: [BrandMapper, BrandSeeder, BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
