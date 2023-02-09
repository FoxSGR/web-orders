import { createAction, props } from '@ngrx/store';

import { FindPageParams } from '../services';
import { EntityPage } from '../wo-common.types';
import { EntityName } from './entity.types';

export const entityActions = <T> (entityName: EntityName) => ({
  loadPage: createAction(
    `[${entityName}] load page`,
    props<{ params: FindPageParams }>(),
  ),
  pageLoaded: createAction(
    `[${entityName}] page loaded`,
    props<{ page: EntityPage<T> }>(),
  ),
});
