import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColorController } from './color.controller';
import { Color } from './color.entity';
import { ColorMapper } from './color.mapper';
import { ColorService } from './color.service';
import { ColorSeeder } from './color.seeder';

@Module({
  controllers: [ColorController],
  imports: [TypeOrmModule.forFeature([Color])],
  exports: [ColorMapper, ColorService],
  providers: [ColorMapper, ColorService, ColorSeeder],
})
export class ColorModule {}
