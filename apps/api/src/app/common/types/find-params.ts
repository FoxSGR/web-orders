import { IsBoolean, IsOptional, Matches, Min } from 'class-validator';

import type { IFindFilter, IFindParams } from '@web-orders/api-interfaces';
import type { IEntity } from '../entity';
import type { IUser } from '../../user';

export abstract class FindParams<T extends IEntity> implements IFindParams<T> {
  @IsOptional()
  owner: IUser;

  @IsOptional()
  @IsBoolean()
  loadRelations?: boolean;

  @IsOptional()
  sortField?: string;

  @IsOptional()
  @Matches(/^(asc|desc)$/i)
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';

  @IsOptional()
  @Min(0)
  limit?: number;

  @IsOptional()
  @Min(0)
  offset?: number;

  @IsOptional()
  filter?: IFindFilter[];
}
