import { InjectionToken } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';

export interface EntityListCellData<T> {
  entity: T;
  column: TableColumn;
}

export const ENTITY_LIST_TOKEN = new InjectionToken<EntityListCellData<any>>(
  'entity_list.data',
);
