import {
  entityActions,
  entityReducer,
  entitySelectors,
  EntityState,
  EntityStoreConfig,
  initialEntityState,
  Client,
} from '../../common';

export const clientStoreConfig: EntityStoreConfig<EntityState<Client>> = {
  name: 'client',
  initialState: initialEntityState<Client>(),
};

export const clientReducer = entityReducer(clientStoreConfig);
export const clientActions = entityActions(clientStoreConfig.name);
export const clientSelectors = entitySelectors<Client>(clientStoreConfig.name);
