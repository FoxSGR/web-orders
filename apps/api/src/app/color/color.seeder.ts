import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Color } from './color.entity';
import { EntitySeeder } from '../common/entity/entity.seeder';

@Injectable()
export class ColorSeeder extends EntitySeeder<Color> {
  constructor(@InjectRepository(Color) repository: Repository<Color>) {
    super(Color, repository);
  }

  protected identifier(): string {
    return 'name';
  }
}
