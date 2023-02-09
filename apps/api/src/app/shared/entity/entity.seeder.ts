import { Logger } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Connection, DeepPartial, Repository } from 'typeorm';
import get from 'lodash/get';

import { EntityService } from './entity.service';
import { IEntity } from './entity.types';

import { environment } from '../../../environments/environment';

export abstract class EntitySeeder<T extends IEntity> implements Seeder {
  private repository: Repository<T>;
  private logger = new Logger(this.constructor.name);

  protected constructor(
    private readonly entityClass: { new (): T },
    private readonly entityService: EntityService<T>,
    connection: Connection,
    repositoryClass: { new (): Repository<T> },
  ) {
    this.repository = connection.getCustomRepository(repositoryClass);
  }

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
      for (const field of Object.keys(entity)) {
        entity[field] = await entity[field];
      }
    }

    const created: any[] = [];

    for (const entity of entities) {
      const createdEntity = await this.entityService.save(
        entity as any,
        undefined,
        entity.base.owner as any,
      );

      this.logger.debug(
        `Created '${createdEntity.id} - ${get(
          createdEntity,
          this.identifier(),
        )}'`,
      );
    }

    return created;
  }

  drop(): Promise<unknown> {
    return this.repository.clear();
  }

  protected constant(): DeepPartial<T>[] | Promise<DeepPartial<T>[]> {
    return [];
  }

  protected abstract identifier(): keyof T | string;
}
