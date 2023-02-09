import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { ShoeModel } from './shoe-model.entity';
import { ShoeModelRepository } from './shoe-model.repository';
import { EntitySeeder } from '../shared/entity';
import { EntitySeederService } from '../shared';
import { ShoeModelService } from './shoe-model.service';

@Injectable()
@EntitySeederService({ order: 14900 })
export class ShoeModelSeeder extends EntitySeeder<ShoeModel> {
  constructor(connection: Connection, shoeModelService: ShoeModelService) {
    super(ShoeModel, shoeModelService, connection, ShoeModelRepository);
  }

  protected identifier = () => 'reference' as keyof ShoeModel;
}
