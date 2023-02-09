import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Color } from './color.entity';
import { EntitySeeder } from '../shared/entity';
import { EntitySeederService } from '../shared';
import { ColorRepository } from './color.repository';
import { ColorService } from './color.service';

@Injectable()
@EntitySeederService({ order: 14700 })
export class ColorSeeder extends EntitySeeder<Color> {
  constructor(connection: Connection, private colorService: ColorService) {
    super(Color, colorService, connection, ColorRepository);
  }

  protected identifier = () => 'name' as keyof Color;
}
