import { IsBoolean, IsOptional, Matches, Min } from 'class-validator';

import { IEntity } from './entity';
import { IUser } from '../../user';

export abstract class FindParams<T extends IEntity> {
  @IsOptional()
  owner: IUser;

  @IsOptional()
  @IsBoolean()
  loadRelations?: boolean;

  @IsOptional()
  sortField?: keyof T;

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
  filter?: { [key: string]: any };
}
