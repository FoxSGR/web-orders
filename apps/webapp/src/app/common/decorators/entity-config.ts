import { EntityConfigRegister } from '../entity-config.register';
import { Entity } from '../models/entity';
import { EntityConfig } from '../types';

export const WOEntityConfig =
  <T extends Entity>(config: EntityConfig<T>) =>
  _target =>
    EntityConfigRegister.register(config);
