import { DeepPartial } from 'typeorm';

import { EntityService } from './entity';
import { Promial, ResponseFormat } from './types';
import { IUser } from '../user';

export abstract class Mapper<T, D> {
  abstract bodyToEntity(
    body: Partial<D>,
    user: IUser,
  ): Promial<T> | DeepPartial<T>;

  abstract entityToResponse(
    input: T,
    type?: ResponseFormat,
  ): DeepPartial<D> | Partial<D>;

  entitiesToResponse(
    input: T[],
    type?: ResponseFormat,
  ): (DeepPartial<D> | Partial<D>)[] {
    return input.map(i => this.entityToResponse(i, type));
  }

  protected async find(
    service: EntityService<any>,
    user: IUser,
    key: number | number[],
  ): Promise<any> {
    if (!key) {
      return undefined;
    }

    if (Array.isArray(key)) {
      return await service.findByIds({ owner: user }, key);
    } else {
      return await service.findOne(key, user, true);
    }
  }

  protected fieldToResponse(
    mapper: Mapper<any, any>,
    data: any | any[],
    type?: ResponseFormat,
  ): any {
    if (!data) {
      return undefined;
    }

    if (Array.isArray(data)) {
      return mapper.entitiesToResponse(data, type);
    } else {
      return mapper.entityToResponse(data, type);
    }
  }

  protected fieldToEntity(
    mapper: Mapper<any, any>,
    user: IUser,
    data: any,
  ): any {
    if (data) {
      return mapper.bodyToEntity(data, user);
    } else {
      return undefined;
    }
  }

  protected fieldToEntityAsync<X = any>(
    mapper: Mapper<X, any>,
    user: IUser,
    data: any,
  ): Promial<X> {
    if (data) {
      return mapper.bodyToEntity(data, user) as Promial<X>;
    } else {
      return undefined;
    }
  }
}
