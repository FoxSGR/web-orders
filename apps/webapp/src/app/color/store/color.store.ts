import {
  entityActions,
  entityReducer,
  entitySelectors,
  EntityState,
  EntityStoreConfig,
  initialEntityState,
  Color,
} from '../../common';

export const colorStoreConfig: EntityStoreConfig<EntityState<Color>> = {
  name: 'color',
  initialState: initialEntityState<Color>(),
};

export const colorReducer = entityReducer(colorStoreConfig);
export const colorActions = entityActions(colorStoreConfig.name);
export const colorSelectors = entitySelectors<Color>(colorStoreConfig.name);
