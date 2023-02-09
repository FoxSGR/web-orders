import { EntityPage } from '../wo-common.types';

export type EntityName = 'sample';

export interface EntityState<T> {
  loaded: T[];
  page?: EntityPage<T>;
}

export interface EntityStoreConfig<T> {
  name: EntityName;
  initialState: T;
}
