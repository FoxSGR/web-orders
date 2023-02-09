import {
  entityActions,
  entityReducer,
  entitySelectors,
  EntityState,
  EntityStoreConfig,
  initialEntityState,
  ShoeComponent,
} from '../../common';

export const shoeComponentStoreConfig: EntityStoreConfig<
  EntityState<ShoeComponent>
> = {
  name: 'shoe-component',
  initialState: initialEntityState<ShoeComponent>(),
};

export const shoeComponentReducer = entityReducer(shoeComponentStoreConfig);
export const shoeComponentActions = entityActions(
  shoeComponentStoreConfig.name,
);
export const shoeComponentSelectors = entitySelectors<ShoeComponent>(
  shoeComponentStoreConfig.name,
);
