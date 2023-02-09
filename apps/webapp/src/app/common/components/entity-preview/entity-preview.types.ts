import { Observable } from 'rxjs';

import { Id } from '@web-orders/api-interfaces';
import { Entity } from '../../models/entity';
import { WOItemMap } from '../../wo-common.types';
import { EntityType } from '../../types';

export interface EntityPreviewItem<T extends Entity = Entity> {
  value: string | object | Date | (() => Observable<any> | any);
  label: string;
  icon?: string | (() => string);
  valueType?: 'prop' | 'value';
  type?: 'simple' | 'text' | 'map' | 'color' | 'photo';
  hidden?: (entity: Entity) => boolean;
  choices?: WOItemMap;
  preview?: {
    type: EntityType;
    idProp?: string;
    id?: Id;
  };
}

export type EntityPreviewColumns = 1 | 2 | 3 | 4;

export interface EntityPreviewGroup {
  header?: {
    title: string;
    subTitle?: string;
    icon?: string;
  };
  emptyText?: string;
  showIndex?: boolean;
  columns?: EntityPreviewColumns;
  collapsable?: boolean;
  collapsed?: boolean;
  type?: 'items' | 'groups';
  items: EntityPreviewItem[] | EntityPreviewGroup[];
}

export interface EntityPreviewItemGroup extends EntityPreviewGroup {
  type?: 'items';
  items: EntityPreviewItem[];
}

export interface EntityPreviewGroupGroup extends EntityPreviewGroup {
  type: 'groups';
  items: EntityPreviewGroup[];
}

export interface EntityPreviewConfig {
  header: {
    title: string;
    subTitle?: string | number;
  };
  groups: (EntityPreviewItemGroup | EntityPreviewGroupGroup)[];
}

export type EntityPreviewGenerator<T extends Entity> = (
  entity: T,
  print: boolean,
) => EntityPreviewConfig;
