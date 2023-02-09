import {
  entityReducer,
  EntityState,
  EntityStoreConfig,
  initialEntityState,
  ShoeOrder,
} from '../../common';

export const shoeOrderStoreConfig: EntityStoreConfig<EntityState<ShoeOrder>> = {
  name: 'shoe-order',
  initialState: initialEntityState<ShoeOrder>(),
};

export const shoeOrderReducer = entityReducer(shoeOrderStoreConfig);
