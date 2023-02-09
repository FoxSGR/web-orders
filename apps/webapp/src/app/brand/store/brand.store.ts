import {
  entityActions,
  entityReducer,
  entitySelectors,
  EntityState,
  EntityStoreConfig,
  initialEntityState,
  Brand,
} from '../../common';

export const brandStoreConfig: EntityStoreConfig<EntityState<Brand>> = {
  name: 'brand',
  initialState: initialEntityState<Brand>(),
};

export const brandReducer = entityReducer(brandStoreConfig);
export const brandActions = entityActions(brandStoreConfig.name);
export const brandSelectors = entitySelectors<Brand>(brandStoreConfig.name);
