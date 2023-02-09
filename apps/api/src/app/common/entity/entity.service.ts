import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { FindConditions, In, Repository } from 'typeorm';
import _ from 'lodash';

import { Id } from '@web-orders/api-interfaces';
import { FindParams, IEntity, Page } from '../types';
import type { IUser } from '../../user/user.types';

interface EntityServiceConfig {
  name: string;
  owned?: boolean;
  relations?: string[];
  cache: boolean;
}

const defaultConfig: EntityServiceConfig = {
  name: 'unknown_entity',
  owned: true,
  relations: undefined,
  cache: false,
};

export class EntityService<T extends IEntity> {
  private get config(): EntityServiceConfig {
    return this._config;
  }

  private set config(value: Partial<EntityServiceConfig>) {
    this._config = { ...defaultConfig, ...value };
  }

  private _config: EntityServiceConfig;

  protected filterMapping: any = {};

  constructor(
    protected repository: Repository<T>,
    config: Partial<EntityServiceConfig>,
  ) {
    this.config = config;
  }

  async findPage(params: FindParams<T>): Promise<Page<T>> {
    const [entities, count] = await this.repository.findAndCount(
      this.buildFindOptions(params),
    );

    await this.setupFoundEntities(entities, params);
    return {
      offset: params.offset,
      size: params.limit,
      items: entities,
      total: count,
    };
  }

  async findAll(params: FindParams<T>): Promise<T[]> {
    const entities = await this.repository.find(this.buildFindOptions(params));

    await this.setupFoundEntities(entities, params);
    return entities;
  }

  async findByIds(params: FindParams<T>, ids: Id[]): Promise<T[]> {
    const entities = await this.repository.findByIds(
      ids,
      this.buildFindOptions(params),
    );

    if (entities.length !== ids.length) {
      throw new NotFoundException(`not_found_${this.config.name}`);
    }

    await this.setupFoundEntities(entities, params);
    return entities;
  }

  async findOne(
    id: Id,
    user?: IUser,
    required = false,
  ): Promise<T | undefined> {
    const params: FindParams<T> = { owner: user, loadRelations: true };
    const entity = await this.repository.findOne(
      id,
      this.buildFindOptions(params),
    );

    if (!entity) {
      if (required) {
        throw new NotFoundException(`not_found_${this.config.name}`);
      }

      return entity;
    }

    await this.setupFoundEntities([entity], params);
    return entity;
  }

  async create(entity: Partial<T>, user?: IUser): Promise<T> {
    if (this.config.owned) {
      entity['base'] = { owner: user } as any;
    }

    try {
      const created = await this.repository.save(entity as any, {
        reload: true,
      });

      await this.setupFoundEntities([created], {
        owner: user,
        loadRelations: true,
      });

      return created;
    } catch (e: any) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new HttpException('duplicate', 409);
      } else {
        throw e;
      }
    }
  }

  async update(id: Id, entity: Partial<T>, user?: IUser): Promise<T> {
    const found = await this.findOne(id, user);
    if (!found) {
      return undefined;
    }

    // delete undefined fields to merge with the existing entity
    Object.keys(entity)
      .filter(key => entity[key] === undefined)
      .forEach(key => delete entity[key]);

    return (await this.repository.save({
      ...found,
      ...entity,
    } as any)) as any;
  }

  async delete(id: Id, user: IUser): Promise<T> {
    const entity = await this.findOne(id, user);
    if (!entity) {
      throw new NotFoundException();
    }

    await this.repository.softDelete(id);
    return entity;
  }

  protected async setupFoundEntities(
    entities: T[],
    params: FindParams<T>,
  ): Promise<void> {
    for (const entity of entities) {
      if (this.config.owned) {
        entity.base.owner = params.owner;
      }

      if (params.loadRelations && this.config.relations) {
        for (const relation of this.config.relations) {
          entity[relation] = await entity[relation];
        }
      }
    }
  }

  private buildFindOptions(params: FindParams<T>): any {
    const order: any = {};
    if (!params.sortField) {
      order['id'] = params.sortDirection || 'DESC';
    } else {
      order[params.sortField] = params.sortField || 'ASC';
    }

    for (const key of Object.keys(order)) {
      order[key] = order[key].toLocaleUpperCase();
    }

    return {
      relations: params.loadRelations ? this.config.relations : undefined,
      withDeleted: false,
      skip: params.offset,
      take: params.limit || 50,
      where: this.buildWhere(params),
      order,
      cache: this.config.cache,
    };
  }

  private buildWhere(params: FindParams<T>): FindConditions<T> {
    const where: any = {};

    if (this.config.owned) {
      where.base = { owner: params.owner };
    }

    if (params.filter) {
      for (const key of Object.keys(params.filter)) {
        const mapping = this.filterMapping[key];
        if (!mapping) {
          throw new BadRequestException(`Unrecognized filter '${key}'`);
        }

        let value = params.filter[key];
        if (Array.isArray(value)) {
          value = In(value);
        }

        _.set(where, mapping, value);
      }
    }

    return where;
  }
}
