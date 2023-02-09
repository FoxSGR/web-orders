import { createAction, props } from '@ngrx/store';

import { IFindParams } from '@web-orders/api-interfaces';
import { EntityPage } from '../wo-common.types';
import { EntityName } from './entity.types';

export const entityActions = <T>(entityName: EntityName) => ({
  loadPage: createAction(
    `[${entityName}] load page`,
    props<{ params: IFindParams<T> }>(),
  ),
  pageLoaded: createAction(
    `[${entityName}] page loaded`,
    props<{ page: EntityPage<T> }>(),
  ),
  pageLoadError: createAction(
    `[${entityName}] page load error`,
    props<{ error: any }>(),
  ),
  reloadPage: createAction(`[${entityName}] reload page`),
  delete: createAction(
    `[${entityName}] delete`,
    props<{ entity: Partial<T> }>(),
  ),
});
