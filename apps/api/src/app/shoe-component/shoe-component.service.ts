import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EntityService } from '../common/entity';
import { ShoeComponent } from './shoe-component.entity';

@Injectable()
export class ShoeComponentService extends EntityService<ShoeComponent> {
  constructor(
    @InjectRepository(ShoeComponent)
    shoeComponentRepository: Repository<ShoeComponent>,
  ) {
    super(shoeComponentRepository, {
      name: 'shoe_component',
      relations: ['color'],
    });
  }
}
