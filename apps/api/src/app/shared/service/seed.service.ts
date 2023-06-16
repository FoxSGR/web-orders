import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Seeder } from 'nestjs-seeder';

import { environment } from '../../../environments/environment';
import { Cli, entitySeeders } from '../decorators';
import { CliService } from '../../cli/cli.service';

@Cli('seed')
@Injectable()
export class SeedService extends CliService {
  constructor(private connection: Connection) {
    super();
  }

  async run() {
    this.logger.log('Starting to seed');

    entitySeeders.sort((a, b) => a.config.order - b.config.order);
    const seeders: Seeder[] = entitySeeders.map(s =>
      this._application.get(s.clazz),
    );

    this.logger.log(
      `Dropping and synchronizing database '${environment.database.database}'`,
    );
    await this.connection.synchronize(true);

    for (const seeder of seeders) {
      this.logger.log(`Seeding ${seeder.constructor.name}`);
      await seeder.seed();
    }

    this.logger.log('Seeding complete');
  }
}
