import { IFindParams } from '@web-orders/api-interfaces';
import { EntityPage } from '../wo-common.types';

export type EntityName = 'sample';
export type EntityStatus = 'unloaded' | 'loading' | 'loaded';

export interface EntityState<T> {
  loaded: T[];
  page?: EntityPage<T>;
  filter: IFindParams<T>;
  status: EntityStatus;
}

export interface EntityStoreConfig<T> {
  name: EntityName;
  initialState: T;
}
