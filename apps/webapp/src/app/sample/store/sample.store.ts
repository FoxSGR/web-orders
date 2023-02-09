import {
  entityReducer,
  EntityState,
  EntityStoreConfig,
  initialEntityState,
  ShoeSample,
} from '../../common';

export const sampleStoreConfig: EntityStoreConfig<EntityState<ShoeSample>> = {
  name: 'sample',
  initialState: initialEntityState<ShoeSample>(),
};

export const sampleReducer = entityReducer(sampleStoreConfig);
