import { Id } from '@web-orders/api-interfaces';
import type { EntityListConfig } from '../components/entity-list/entity-list.types';
import { Entity } from '../models/entity';
import { EntityService } from '../services';
import { EntityFormWizard } from './wizard.types';
import { EntityPreviewConfig } from '../components/entity-preview/entity-preview.types';

export type OptionalId = Id | '_';

export const entityTypes = [
  'sample',
  'client',
  'agent',
  'brand',
  'color',
  'shoe-component',
] as const;
export type EntityType = typeof entityTypes[number];

export interface EntityConfig<
  T extends Entity,
  S extends EntityService<T> = EntityService<T>,
> {
  entityType: EntityType;
  label: (entity: T) => string;
  route?: string;
  serviceClass: { new (...t: any): S };
  service?: S;
  listConfig: EntityListConfig<T>;
  wizardConfig?: EntityFormWizard;
  previewConfig?: (entity: T, print: boolean) => EntityPreviewConfig;
}
