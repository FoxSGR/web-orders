import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EntityService } from '../common/entity';
import { ShoeModel } from './shoe-model.entity';

@Injectable()
export class ShoeModelService extends EntityService<ShoeModel> {
  constructor(
    @InjectRepository(ShoeModel)
    shoeModelRepository: Repository<ShoeModel>,
  ) {
    super(shoeModelRepository, {
      name: 'shoe_model',
      relations: ['components'],
    });
  }
}
