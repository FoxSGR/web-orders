import {
  entityActions,
  entityReducer,
  entitySelectors,
  EntityState,
  EntityStoreConfig,
  initialEntityState,
  Agent,
} from '../../common';

export const agentStoreConfig: EntityStoreConfig<EntityState<Agent>> = {
  name: 'agent',
  initialState: initialEntityState<Agent>(),
};

export const agentReducer = entityReducer(agentStoreConfig);
export const agentActions = entityActions(agentStoreConfig.name);
export const agentSelectors = entitySelectors<Agent>(agentStoreConfig.name);
