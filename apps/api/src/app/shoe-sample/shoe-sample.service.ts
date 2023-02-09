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
      relations: [
        'baseModel',
        'sampleModel',
        'baseModel.components',
        'sampleModel.components',
        'sampleModel.components.component',
        'client',
        'agent',
        'brand',
      ],
      mapping: {
        'sampleModel.reference': {
          prop: 'sampleModel.reference',
        },
        'client.name': {
          prop: 'client.name',
        },
        'agent.name': {
          prop: 'agent.name',
        },
        'brand.name': {
          prop: 'brand.name',
        },
        notes: {
          prop: 'notes',
        },
        'components.component.reference': {
          prop: 'sampleModel.components.component.reference',
        },
        'components.component.name': {
          prop: 'sampleModel.components.component.name',
        },
      },
    });
  }

  async create(entity: Partial<ShoeSample>, user: IUser): Promise<ShoeSample> {
    entity.sampleModel.type = 'sample';
    return super.create(entity, user);
  }
}
