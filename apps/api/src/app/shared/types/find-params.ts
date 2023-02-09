import { IsIn, IsInt, IsOptional, Matches, Min } from 'class-validator';
import { Type } from 'class-transformer';

import type { IFindFilter, IFindParams } from '@web-orders/api-interfaces';
import type { IEntity } from '../entity';
import type { IUser } from '../../user';

export abstract class FindParams<T extends IEntity> implements IFindParams<T> {
  @IsOptional()
  owner: IUser;

  @IsOptional()
  @IsIn(['true', 'false', true, false])
  loadRelations?: 'true' | 'false' | boolean;

  @IsOptional()
  sortField?: string;

  @IsOptional()
  @Matches(/^(asc|desc)$/i)
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';

  @IsOptional()
  @Min(0)
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  filter?: IFindFilter[];
}
