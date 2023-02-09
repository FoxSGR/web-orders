import { Logger } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { DeepPartial, Repository } from 'typeorm';

import { environment } from '../../../environments/environment';

export abstract class EntitySeeder<T> implements Seeder {
  private logger = new Logger(this.constructor.name);

  protected constructor(
    private readonly entityClass: { new (): T },
    private readonly repository: Repository<T>
  ) {}

  async seed(): Promise<T[]> {
    if (environment.production) {
      return;
    }

    const entities = await this.constant();

    const generated: DeepPartial<T>[] = DataFactory.createForClass(
      this.entityClass
    ).generate(10) as any;
    entities.push(...generated);

    for (const entity of entities) {
      entity['base'] = { owner: { id: 1 } };

      for (const field of Object.keys(entity)) {
        entity[field] = await entity[field];
      }
    }

    const created = await this.repository.save(entities as any[]);

    created.forEach((entity) =>
      this.logger.log(`Created '${entity.id} - ${entity[this.identifier()]}'`)
    );

    return created;
  }

  drop(): Promise<unknown> {
    return this.repository.clear();
  }

  protected constant(): Promise<DeepPartial<T>[]> {
    return Promise.resolve([]);
  }

  protected abstract identifier(): string;
}
