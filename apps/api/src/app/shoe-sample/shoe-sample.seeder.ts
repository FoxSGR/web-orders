import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { ShoeSample } from './shoe-sample.entity';
import { ShoeSampleRepository } from './shoe-sample.repository';
import { ShoeSampleService } from './shoe-sample.service';
import { EntitySeeder } from '../shared/entity';
import { EntitySeederService } from '../shared';

@Injectable()
@EntitySeederService({ order: 15000 })
export class ShoeSampleSeeder extends EntitySeeder<ShoeSample> {
  constructor(connection: Connection, shoeSampleService: ShoeSampleService) {
    super(ShoeSample, shoeSampleService, connection, ShoeSampleRepository);
  }

  protected identifier = () => 'sampleModel.reference';
}
