import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Seeder } from 'nestjs-seeder';

import { environment } from '../../environments/environment';
import { Cli } from './cli.decorator';
import { CliService } from './cli.service';
import { UserSeeder } from '../user';
import { ColorSeeder } from '../color';

@Cli('seed')
@Injectable()
export class SeedService extends CliService {
  constructor(private connection: Connection) {
    super();
  }

  async run() {
    this.logger.log('Starting to seed');

    const seederClasses = [UserSeeder, ColorSeeder];
    const seeders: Seeder[] = seederClasses.map((clazz) =>
      this._application.get(clazz)
    );

    this.logger.log(
      `Dropping and synchronizing database '${environment.database.database}'`
    );
    await this.connection.synchronize(true);

    for (const seeder of seeders) {
      this.logger.log(`Seeding ${seeder.constructor.name}`);
      await seeder.seed();
    }

    this.logger.log('Seeding complete');
  }
}
