import { IFindParams } from '@web-orders/api-interfaces';
import { EntityPage } from '../wo-common.types';

export type EntityName = 'sample';

export interface EntityState<T> {
  loaded: T[];
  page?: EntityPage<T>;
  filter: IFindParams<T>;
  status: 'unloaded' | 'loading' | 'loaded';
}

export interface EntityStoreConfig<T> {
  name: EntityName;
  initialState: T;
}
