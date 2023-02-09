import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { FindConditions, FindManyOptions, In, Like, Repository } from 'typeorm';
import _ from 'lodash';

import { Id, IFindFilter } from '@web-orders/api-interfaces';
import { FindParams, Page } from '../types';
import type { IUser } from '../../user/user.types';
import { IEntity, EntityFieldMapping } from '.';

interface EntityServiceConfig {
  name: string;
  owned?: boolean;
  relations?: string[];
  cache: boolean;
  mapping?: {
    [key: string]: EntityFieldMapping;
  };
}

const defaultConfig: EntityServiceConfig = {
  name: 'unknown_entity',
  owned: true,
  relations: undefined,
  cache: false,
  mapping: {},
};

export class EntityService<T extends IEntity> {
  private get config(): EntityServiceConfig {
    return this._config;
  }

  private set config(value: Partial<EntityServiceConfig>) {
    this._config = { ...defaultConfig, ...value };
  }

  private _config: EntityServiceConfig;

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
    // const dirtyFilters =
    //   params.filter?.filter(
    //     field => this.fieldMapping(field.prop).filterMode === 'dirty',
    //   ) || [];

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      if (this.config.owned) {
        entity.base.owner = params.owner;
      }

      if (params.loadRelations && this.config.relations) {
        await this.loadRelations(entity);
      }

      // if (
      //   dirtyFilters.find(
      //     field =>
      //       !dirtyFilter(entity, field.value, this.fieldMapping(field.prop)),
      //   )
      // ) {
      //   console.log('remove')
      //   entities.splice(i, 1);
      // }
    }
  }

  private async loadRelations(entity: any) {
    for (const relation in entity) {
      entity[relation] = await entity[relation];
      if (typeof entity[relation] === 'object') {
        await this.loadRelations(entity[relation]);
      }
    }
  }

  private buildFindOptions(params: FindParams<T>): FindManyOptions<T> {
    const order: any = {};
    if (!params.sortField) {
      order['id'] = params.sortDirection || 'DESC';
    } else {
      const mapping = this.fieldMapping(params.sortField);
      order[mapping.prop] = params.sortDirection || 'ASC';
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
      for (const field of params.filter) {
        const mapping = this.fieldMapping(field.prop);
        if (mapping.filterMode === 'dirty') {
          continue;
        }

        let value = field.value;
        if (Array.isArray(value)) {
          value = In(value.map(v => this.mapFilterValue(field, v)));
        } else {
          value = Like(this.mapFilterValue(field, value));
        }

        _.set(where, mapping.prop, value);
      }
    }

    return where;
  }

  private mapFilterValue(field: IFindFilter, value: any) {
    if (field.type === 'contains') {
      return `%${value}%`;
    } else {
      return value;
    }
  }

  private fieldMapping(key: string): EntityFieldMapping {
    if (key === 'id') {
      return {
        prop: 'id',
      };
    }

    const mapping = this.config.mapping[key];
    if (!mapping) {
      throw new BadRequestException(`No mapping configured for key '${key}'`);
    }

    return mapping;
  }
}
