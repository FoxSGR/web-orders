import { DeepPartial } from 'typeorm';

import { Promial, ResponseFormat } from './types';
import { IUser } from '../user/user.types';
import { EntityService } from './entity/entity.service';

export abstract class Mapper<T, D> {
  abstract bodyToEntity(
    body: Partial<D>,
    user: IUser
  ): Promial<T> | DeepPartial<T>;

  abstract entityToResponse(input: T, type?: ResponseFormat): D;

  protected async find(
    service: EntityService<any>,
    user: IUser,
    key: number
  ): Promise<any> {
    if (key) {
      return await service.findOne(key, user, true);
    } else {
      return null;
    }
  }

  protected fieldToResponse(
    mapper: Mapper<any, any>,
    data: any,
    type?: ResponseFormat
  ): any {
    if (data) {
      return mapper.entityToResponse(data, type);
    } else {
      return undefined;
    }
  }

  protected fieldToEntity(
    mapper: Mapper<any, any>,
    user: IUser,
    data: any
  ): any {
    if (data) {
      return mapper.bodyToEntity(data, user);
    } else {
      return undefined;
    }
  }

  protected fieldToEntityAsync(
    mapper: Mapper<any, any>,
    user: IUser,
    data: any
  ): Promial<any> {
    if (data) {
      return mapper.bodyToEntity(data, user) as Promial<any>;
    } else {
      return undefined;
    }
  }
}
