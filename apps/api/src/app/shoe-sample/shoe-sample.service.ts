import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EntityService } from '../common/entity';
import { ShoeSample } from './shoe-sample.entity';
import type { IUser } from '../user';

@Injectable()
export class ShoeSampleService extends EntityService<ShoeSample> {
  constructor(
    @InjectRepository(ShoeSample) shoeSampleRepository: Repository<ShoeSample>,
  ) {
    super(shoeSampleRepository, {
      name: 'shoe_sample',
      relations: ['baseModel', 'sampleModel', 'client', 'agent', 'brand'],
    });
  }

  async create(entity: Partial<ShoeSample>, user: IUser): Promise<ShoeSample> {
    entity.sampleModel.type = 'sample';
    return super.create(entity, user);
  }
}
