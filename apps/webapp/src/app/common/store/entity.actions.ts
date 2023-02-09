import { createAction, props } from '@ngrx/store';
import { memoize } from 'lodash';

import { Id } from '@web-orders/api-interfaces';
import { EntityPage } from '../wo-common.types';
import { EntityType, OptionalId, SmartFormState } from '../types';

const _entityActions = <T>(entityName: EntityType) => ({
  loadPage: createAction(`[${entityName}] load page`),
  pageLoaded: createAction(
    `[${entityName}] page loaded`,
    props<{ page: EntityPage<T> }>(),
  ),
  pageLoadError: createAction(
    `[${entityName}] page load error`,
    props<{ error: any }>(),
  ),
  deleted: createAction(
    `[${entityName}] deleted`,
    props<{ entity: Partial<T> }>(),
  ),
  wizard: createAction(`[${entityName}] wizard`, props<{ id?: OptionalId }>()),
  loadWizard: createAction(
    `[${entityName}] load wizard`,
    props<{ id: OptionalId }>(),
  ),
  updateWizard: createAction(
    `[${entityName}] update wizard`,
    props<{ id: OptionalId; wizardState: SmartFormState }>(),
  ),
  clearWizard: createAction(
    `[${entityName}] clear wizard`,
    props<{ id: OptionalId }>(),
  ),
});

export const entityActions = memoize(_entityActions);
