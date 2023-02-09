import { Logger } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { DeepPartial, Repository } from 'typeorm';
import get from 'lodash/get';

import type { IEntity } from '.';
import { environment } from '../../../environments/environment';

export abstract class EntitySeeder<T extends IEntity> implements Seeder {
  static readonly defaultBase = {
    owner: { id: 1 },
  };

  private logger = new Logger(this.constructor.name);

  protected nested: string[] = [];

  protected constructor(
    private readonly entityClass: { new (): T },
    private readonly repository: Repository<T>,
  ) {}

  async seed(): Promise<T[]> {
    if (environment.production) {
      return;
    }

    const entities = await this.constant();

    const generated: DeepPartial<T>[] = DataFactory.createForClass(
      this.entityClass,
    ).generate(100) as any;
    entities.push(...generated);

    for (const entity of entities) {
      entity.base = EntitySeeder.defaultBase as any;

      for (const field of Object.keys(entity)) {
        entity[field] = await entity[field];
      }

      this.nested.forEach(prop => {
        const nested = get(entity, prop);
        if (Array.isArray(nested)) {
          nested.forEach(e => (e.base = EntitySeeder.defaultBase));
        } else if (nested) {
          nested.base = EntitySeeder.defaultBase;
        }
      });
    }

    const created = await this.repository.save(entities as any[]);

    created.forEach(entity =>
      this.logger.log(
        `Created '${entity.id} - ${get(entity, this.identifier())}'`,
      ),
    );

    return created;
  }

  drop(): Promise<unknown> {
    return this.repository.clear();
  }

  protected constant(): Promise<DeepPartial<T>[]> {
    return Promise.resolve([]);
  }

  protected abstract identifier(): keyof T | string;
}
