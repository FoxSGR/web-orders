import { InjectionToken } from '@angular/core';
import {
  EntityListAbstractColumn,
  EntityListColumn,
} from './entity-list.types';

import { Entity } from '../../models/entity';

export interface EntityListCellData<
  T extends Entity,
  S extends EntityListAbstractColumn<T> = EntityListColumn<T>,
> {
  entity: T;
  column: S;
}

export const ENTITY_LIST_TOKEN = new InjectionToken<EntityListCellData<any>>(
  'entity_list.data',
);
