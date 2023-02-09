import { TableColumn } from '@swimlane/ngx-datatable';
import { IFindParams } from '@web-orders/api-interfaces';
import { Observable } from 'rxjs';

import { Entity } from '../../models/entity';
import { EntityService } from '../../services';
import { EntityType, SmartFormState } from '../../types';
import { EntityPage, WOItemMap } from '../../wo-common.types';

export interface EntityListAbstractColumn<T extends Entity>
  extends TableColumn {
  template?: any;
  hide?: (entity: T) => boolean;
}

export interface EntityListColumnChoices<T extends Entity>
  extends EntityListAbstractColumn<T> {
  choices: WOItemMap;
}

export type EntityListColumn<T extends Entity> =
  | EntityListAbstractColumn<T>
  | EntityListColumnChoices<T>;

export interface EntityListConfig<
  T extends Entity,
  S extends EntityService<T> = EntityService<T>,
> {
  hideSearch?: boolean;
  searchables: EntityListSearchable[];
  columns: EntityListColumn<T>[];
  findPage?: (
    service: S,
    params: IFindParams<T>,
    state: SmartFormState,
  ) => Observable<EntityPage<T>>;
  selection?: 'single' | 'multiple';
}

export interface EntityListSearchable {
  label: string;
  prop: string;
  choices?: WOItemMap;
}

export interface EntityListSearchBar extends EntityListSearchable {
  value?: string;
}
