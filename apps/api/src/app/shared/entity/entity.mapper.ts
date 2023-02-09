import { Mapper } from '../mapper';

import { EntityDTO } from './entity.dto';
import { ResponseFormat } from '../types';
import { IEntity } from './entity.types';

export abstract class EntityMapper<
  T extends IEntity,
  D extends EntityDTO,
> extends Mapper<T, D> {
  entityToResponse(input: T, _type?: ResponseFormat): Partial<D> {
    return {
      id: input.id,
      createdAt: input.base?.createdAt,
      updatedAt: input.base?.updatedAt,
      deletedAt: input.base?.deletedAt,
    } as any;
  }
}
