import { EntityConfig, EntityType } from './types';
import { Entity } from './models/entity';

export class EntityConfigRegister {
  private static definitions: { [key: string]: EntityConfig<any> } = {};

  static register(config: EntityConfig<any>) {
    this.definitions[config.entityType] = config;
  }

  static getDefinition<T extends Entity>(
    entityType: EntityType,
  ): EntityConfig<T> {
    return this.definitions[entityType];
  }
}

export const entityListRegister: { [key: string]: EntityConfig<any> } = {};
