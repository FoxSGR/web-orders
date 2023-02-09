import { ForbiddenException } from '@nestjs/common';

import { EntityService } from './entity.service';
import { Mapper } from '../mapper';
import { FindParams, Id, IEntity, Page, ResponseFormat } from '../types';
import { IUser } from '../../user';
import { DeepPartial } from 'typeorm';

export abstract class EntityController<T extends IEntity, D> {
  protected service: EntityService<T>;
  protected mapper: Mapper<T, D>;

  public async findOne(user: IUser, id: Id): Promise<D | undefined> {
    if (!this.hasPermission(user, 'findOne', id)) {
      throw new ForbiddenException();
    }

    const entity = await this.service.findOne(id, user);
    if (entity) {
      return this.toResponse(entity, 'full') as D;
    } else {
      return undefined;
    }
  }

  public async find(
    user: IUser,
    params: FindParams<T> = { owner: user }
  ): Promise<Page<D>> {
    if (!this.hasPermission(user, 'findAll')) {
      throw new ForbiddenException();
    }

    params.owner = user;

    const page = await this.service.findPage(params);
    return {
      ...page,
      items: page.items.map((entity) => this.toResponse(entity)) as D[],
    };
  }

  public async create(user: IUser, body: Partial<D>): Promise<D> {
    if (!this.hasPermission(user, 'create')) {
      throw new ForbiddenException();
    }

    const entity = await this.service.create(
      (await this.mapper.bodyToEntity(body, user)) as any,
      user
    );

    return this.toResponse(entity, 'full') as D;
  }

  public async update(user: IUser, id: number, body: Partial<D>): Promise<D> {
    if (!this.hasPermission(user, 'update')) {
      throw new ForbiddenException();
    }

    const entity = await this.service.update(
      id,
      (await this.mapper.bodyToEntity(body, user)) as any,
      user
    );

    return this.toResponse(entity, 'full') as D;
  }

  public async delete(user: IUser, id: Id): Promise<D> {
    if (!this.hasPermission(user, 'delete', id)) {
      throw new ForbiddenException();
    }

    const entity = await this.service.delete(id, user);
    return this.toResponse(entity) as D;
  }

  protected readonly toResponse = (entity: T, type?: ResponseFormat) => {
    let response = this.mapper.entityToResponse(entity, type);

    const base = entity['base'];
    if (base) {
      if (base.owner && typeof base.owner === 'object') {
        base.owner = base.owner.id;
      }

      response = {
        ...response,
        ...base,
      };
    }

    return response;
  };

  protected hasPermission(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user: IUser,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type: 'findOne' | 'findAll' | 'create' | 'update' | 'delete',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id?: any
  ): boolean {
    return true;
  }
}
