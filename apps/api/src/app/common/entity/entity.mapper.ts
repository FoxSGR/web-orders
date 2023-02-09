import { Mapper } from '../mapper';
import type { IEntity } from '.';
import { EntityDTO } from './entity.dto';
import { ResponseFormat } from '../types';

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
      owner: (input as any).base?.owner?.id,
    } as any;
  }
}
