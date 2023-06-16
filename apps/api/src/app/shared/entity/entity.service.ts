import {
  HttpException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection, FindManyOptions, SelectQueryBuilder } from 'typeorm';
import { set, uniq } from 'lodash';

import { Id, IFindFilter } from '@web-orders/api-interfaces';
import { FindParams, Page } from '../types';
import type { IUser } from '../../user/user.types';
import { EntityFieldMapping, IEntity } from './entity.types';
import { WOEntityRepository } from './entity.repository';

interface EntityServiceConfigRelation {
  name: string;
  service?: any;
}

interface EntityServiceConfig {
  name: string;
  owned?: boolean;
  relations?: EntityServiceConfigRelation[];
  cache: boolean;
  mapping?: {
    [key: string]: EntityFieldMapping;
  };
}

const defaultConfig: Partial<EntityServiceConfig> = {
  owned: true,
  relations: undefined,
  cache: false,
  mapping: {},
};

export class EntityService<
  T extends IEntity = IEntity,
  R extends WOEntityRepository<T> = WOEntityRepository<T>,
> {
  get repository(): R {
    // Dynamic initialization, since the Connection object is not available
    // in the constructor phase
    if (!this._repository) {
      const connection = this.moduleRef.get(Connection, { strict: false });
      this._repository = connection.getCustomRepository(this.repositoryClass);
    }

    return this._repository;
  }
  private _repository: R;

  private get config(): EntityServiceConfig {
    return this._config;
  }
  private set config(value: Partial<EntityServiceConfig>) {
    this._config = { ...defaultConfig, ...value } as EntityServiceConfig;
  }
  private _config: EntityServiceConfig;

  constructor(
    private moduleRef: ModuleRef,
    private repositoryClass: { new (): R },
    config: Partial<EntityServiceConfig>,
  ) {
    this.config = config;
  }

  /**
   * Finds a page of entities matching the given filters.
   * @param params
   * @param realFilters
   */
  async findPage(
    params: FindParams<T>,
    realFilters: IFindFilter[] = null,
  ): Promise<Page<T>> {
    const [entities, count] = await this.repository.findAndCount(
      this.buildFindOptions(params, realFilters),
    );

    await this.mapFoundEntities(entities, params);
    return {
      offset: params.offset,
      size: params.limit,
      items: entities,
      total: count,
    };
  }

  /**
   * Finds all entities matching the given filters.
   * @param params
   * @param realFilters
   */
  async findAll(
    params: FindParams<T>,
    realFilters: IFindFilter[] = null,
  ): Promise<T[]> {
    const entities = await this.repository.find(
      this.buildFindOptions(params, realFilters),
    );

    await this.mapFoundEntities(entities, params);
    return entities;
  }

  /**
   * Finds all entities with the given ids.
   * @param params
   * @param ids
   */
  async findByIds(params: FindParams<T>, ids: Id[]): Promise<T[]> {
    const uniqueIds = uniq(ids);

    const entities = await this.repository.findByIds(
      uniqueIds,
      this.buildFindOptions(params),
    );

    if (entities.length !== uniqueIds.length) {
      throw new NotFoundException(`not_found_${this.config.name}`);
    }

    await this.mapFoundEntities(entities, params);
    return ids.map(id => entities.find(e => e.id === id));
  }

  /**
   * Finds one entity with the given id.
   * @param id
   * @param user
   * @param required
   * @param realFilters
   */
  async findOne(
    id: Id,
    user?: IUser,
    required = false,
    realFilters: IFindFilter[] = null,
  ): Promise<T | undefined> {
    const params: FindParams<T> = { owner: user, loadRelations: true };
    const entity = await this.repository.findOne(
      id,
      this.buildFindOptions(params, realFilters),
    );

    if (!entity) {
      if (required) {
        throw new NotFoundException(`not_found_${this.config.name}`);
      }

      return entity;
    }

    await this.mapFoundEntities([entity], params);
    return entity;
  }

  /**
   * Saves an entity.
   * @param entity
   * @param id
   * @param user
   */
  save(entity: Partial<T>, id?: Id, user?: IUser) {
    if (id) {
      return this.update(id, entity, user);
    } else {
      return this.create(entity, user);
    }
  }

  /**
   * Creates an entity.
   * @param entity
   * @param user
   * @protected
   */
  protected async create(entity: Partial<T>, user?: IUser): Promise<T> {
    if (this.config.owned) {
      entity['base'] = { owner: user } as any;
    }

    try {
      const created = await this.repository.save(entity as any, {
        reload: true,
      });

      await this.mapFoundEntities([created], {
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

  /**
   * Updates an entity.
   * @param id
   * @param entity
   * @param user
   * @protected
   */
  protected async update(id: Id, entity: Partial<T>, user?: IUser): Promise<T> {
    const found = await this.findOne(id, user);
    if (!found) {
      throw new NotFoundException();
    }

    // delete undefined fields to merge with the existing entity
    Object.keys(entity)
      .filter(key => entity[key] === undefined)
      .forEach(key => delete entity[key]);

    return this.repository.save({
      ...found,
      ...entity,
    } as any);
  }

  /**
   * Deletes an entity.
   * @param id
   * @param user
   */
  async delete(id: Id, user: IUser): Promise<T> {
    const entity = await this.findOne(id, user);
    if (!entity) {
      throw new NotFoundException();
    }

    await this.repository.softDelete(id);
    return entity;
  }

  /**
   * Counts the number of entities matching the given filters.
   * @param params
   * @param realFilters
   */
  async count(
    params: FindParams<T>,
    realFilters: IFindFilter[] = null,
  ): Promise<number> {
    return this.repository.count(this.buildFindOptions(params, realFilters));
  }

  /**
   * Applies the given filters to the given query builder.
   * @param queryBuilder
   * @param filters
   * @param map
   */
  applyFilterToQueryBuilder(
    queryBuilder: SelectQueryBuilder<any>,
    filters: IFindFilter[],
    map = true,
  ) {
    filters.forEach(filter => {
      let mapping: EntityFieldMapping;

      if (map) {
        mapping = this.fieldMapping(filter.prop);
      } else {
        mapping = {
          prop: filter.prop,
        };
      }

      let condition;
      if (Array.isArray(filter.value)) {
        const values = filter.value
          .map(v => `'${this.mapFilterValue(filter, v)}'`)
          .join(',');
        condition = `IN (${values})`;
      } else {
        condition = `LIKE '${this.mapFilterValue(filter, filter.value)}'`;
      }

      if (filter.negate) {
        condition = `NOT ${condition}`;
      }

      const prop = this.mapPropForQueryBuilder(queryBuilder, mapping.prop);
      queryBuilder = queryBuilder.andWhere(`${prop} ${condition}`);
    });
  }

  /**
   * Maps a property path to a query property path.
   * @param queryBuilder
   * @param prop
   * @private
   */
  private mapPropForQueryBuilder(
    queryBuilder: SelectQueryBuilder<any>,
    prop: string,
  ): string {
    const propParts = prop.split('.');
    const relationAlias = propParts.slice(0, propParts.length - 1).join('.');
    const propField = propParts[propParts.length - 1];

    prop = `\`${queryBuilder.expressionMap.mainAlias.name}\`.${prop}`;

    // find the table alias that matches the current filter
    for (const alias of queryBuilder.expressionMap.aliases) {
      if (alias.type === 'from') continue;

      const name = alias.name
        .replace(`${queryBuilder.expressionMap.mainAlias.name}__`, '')
        .replace(/_+/g, '.');
      if (name === relationAlias) {
        prop = `\`${alias.name}\`.\`${propField}\``;
        break;
      }
    }

    return prop;
  }

  /**
   * Maps entities.
   * @param entities
   * @param params
   */
  async mapFoundEntities(entities: T[], params: FindParams<T>): Promise<void> {
    for (const entity of entities) {
      if (this.config.owned && entity.base) {
        entity.base.owner = params.owner;
      }

      if (params.loadRelations && this.config.relations) {
        await this.loadRelations(entity);
      }

      for (const relation of this.config.relations || []) {
        if (relation.service && entity[relation.name]) {
          const service: EntityService = this.moduleRef.get(relation.service, {
            strict: false,
          });
          await service.mapFoundEntities([entity[relation.name]], params);
        }
      }
    }
  }

  /**
   * Builds the relations array.
   */
  private buildRelations(): string[] {
    const relations = [];

    for (const relation of this.config.relations || []) {
      relations.push(relation.name);

      if (relation.service) {
        const service: EntityService = this.moduleRef.get(relation.service, {
          strict: false,
        });
        const subRelations = service.buildRelations();
        for (const subRelation of subRelations) {
          relations.push(`${relation.name}.${subRelation}`);
        }
      }
    }

    return relations;
  }

  /**
   * Loads entity relations.
   * @param entity
   * @private
   */
  private async loadRelations(entity: any) {
    for (const relation in entity) {
      entity[relation] = await entity[relation];
      if (typeof entity[relation] === 'object') {
        await this.loadRelations(entity[relation]);
      }
    }
  }

  /**
   * Builds options for the find method from the given params.
   * @param params
   * @param realFilters
   * @private
   */
  private buildFindOptions(
    params: FindParams<T>,
    realFilters: IFindFilter[] = null,
  ): FindManyOptions<T> {
    return {
      relations: params.loadRelations ? this.buildRelations() : undefined,
      withDeleted: false,
      skip: params.offset,
      take: params.limit || 50,
      where: this.buildWhere(params, realFilters),
      order: this.buildOrder(params),
      cache: this.config.cache,
    };
  }

  /**
   * Builds the order object for the find method from the given params.
   * @param params
   * @private
   */
  private buildOrder(params: FindParams<T>) {
    const order: any = {};
    if (!params.sortField) {
      order['id'] = params.sortDirection?.toLocaleUpperCase() || 'DESC';
    } else {
      const mapping = this.fieldMapping(params.sortField);
      set(
        order,
        mapping.prop,
        params.sortDirection?.toLocaleUpperCase() || 'ASC',
      );
    }

    return order;
  }

  /**
   * Builds a "where query builder" for the find method from the given params.
   * @param params
   * @param realFilters
   * @private
   */
  private buildWhere(params: FindParams<T>, realFilters: IFindFilter[] = null) {
    return (queryBuilder: SelectQueryBuilder<T>) => {
      if (this.config.owned) {
        queryBuilder.where(
          `\`${queryBuilder.expressionMap.mainAlias.name}\`.ownerId = :ownerId`,
          { ownerId: params.owner.id },
        );
      }

      if (params.filter) {
        this.applyFilterToQueryBuilder(queryBuilder, params.filter, true);
      }
      if (realFilters) {
        this.applyFilterToQueryBuilder(queryBuilder, realFilters, false);
      }
    };
  }

  /**
   * Maps the given filter value.
   * @param field
   * @param value
   * @private
   */
  private mapFilterValue(field: IFindFilter, value: any) {
    if (field.type === 'contains') {
      return `%${value}%`;
    } else {
      return value;
    }
  }

  /**
   * Returns the field mapping for the given key.
   * @param key
   * @private
   */
  private fieldMapping(key: string): EntityFieldMapping {
    if (key === 'id') {
      return { prop: 'id' };
    }

    // If mapping is configured for key, return it
    if (this.config.mapping[key]) {
      return this.config.mapping[key];
    }

    // Build mapping for nested fields
    const path = key.split('.');
    const mapping = this.config.mapping[path[0]];
    if (!mapping) {
      throw new UnprocessableEntityException(
        `No mapping configured for key '${key}'`,
      );
    }

    if (!mapping.relation) {
      throw new UnprocessableEntityException(
        `No nested mappings configured for key '${key}'`,
      );
    }

    const relation = this.config.relations.find(
      r => r.name === mapping.relation,
    );
    if (!relation) {
      throw new UnprocessableEntityException(
        `No mapping configured for key '${key}'`,
      );
    }

    const service: EntityService = this.moduleRef.get(relation.service, {
      strict: false,
    });
    const childMapping = service.fieldMapping(path.slice(1).join('.'));
    return { prop: `${mapping.prop}.${childMapping.prop}` };
  }
}
