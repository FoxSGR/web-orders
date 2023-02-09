import { EntityPage } from '../wo-common.types';
import { FindPageParams } from '../services';

export type EntityName = 'sample';

export interface EntityState<T> {
  loaded: T[];
  page?: EntityPage<T>;
  filter: FindPageParams;
  status: 'unloaded' | 'loading' | 'loaded';
}

export interface EntityStoreConfig<T> {
  name: EntityName;
  initialState: T;
}
