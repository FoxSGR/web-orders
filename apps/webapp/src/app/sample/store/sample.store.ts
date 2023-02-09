import {
  entityActions,
  entityReducer,
  entitySelectors,
  EntityState,
  EntityStoreConfig,
  initialEntityState,
  ShoeSample,
} from '../../common';

export const sampleStoreConfig: EntityStoreConfig<EntityState<ShoeSample>> = {
  name: 'sample',
  initialState: initialEntityState<ShoeSample>(),
};

/**
 * The reducer for sample actions.
 */
export const sampleReducer = entityReducer(sampleStoreConfig);

export const sampleActions = entityActions(sampleStoreConfig.name);

export const sampleSelectors = entitySelectors<ShoeSample>(
  sampleStoreConfig.name,
);
