import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColorController } from './color.controller';
import { ColorMapper } from './color.mapper';
import { ColorService } from './color.service';
import { ColorSeeder } from './color.seeder';
import { ColorRepository } from './color.repository';

@Module({
  controllers: [ColorController],
  imports: [TypeOrmModule.forFeature([ColorRepository])],
  exports: [ColorMapper, ColorService],
  providers: [ColorRepository, ColorMapper, ColorService, ColorSeeder],
})
export class ColorModule {}
