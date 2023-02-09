import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShoeSample } from './shoe-sample.entity';
import { EntitySeeder } from '../common/entity';
import { EntitySeederService } from '../common';

@Injectable()
@EntitySeederService()
export class ShoeSampleSeeder extends EntitySeeder<ShoeSample> {
  nested = [
    'baseModel',
    'sampleModel',
    'baseModel.components',
    'sampleModel.components',
  ];

  constructor(
    @InjectRepository(ShoeSample) repository: Repository<ShoeSample>,
  ) {
    super(ShoeSample, repository);
  }

  protected identifier = () => 'baseModel.reference';
}
