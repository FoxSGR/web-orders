import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { ShoeComponent } from './shoe-component.entity';
import { ShoeComponentRepository } from './shoe-component.repository';
import { ShoeComponentService } from './shoe-component.service';
import { EntitySeeder } from '../shared/entity';
import { EntitySeederService } from '../shared';

@Injectable()
@EntitySeederService({ order: 14800 })
export class ShoeComponentSeeder extends EntitySeeder<ShoeComponent> {
  constructor(
    connection: Connection,
    shoeComponentService: ShoeComponentService,
  ) {
    super(
      ShoeComponent,
      shoeComponentService,
      connection,
      ShoeComponentRepository,
    );
  }

  protected identifier(): keyof ShoeComponent {
    return 'name';
  }
}
