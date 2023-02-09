import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Brand } from './brand.entity';
import { BrandController } from './brand.controller';
import { BrandMapper } from './brand.mapper';
import { BrandSeeder } from './brand.seeder';
import { BrandService } from './brand.service';
import { BrandRepository } from './brand.repository';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand]),
    forwardRef(() => ClientModule),
  ],
  exports: [BrandMapper, BrandService],
  providers: [BrandRepository, BrandMapper, BrandSeeder, BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
