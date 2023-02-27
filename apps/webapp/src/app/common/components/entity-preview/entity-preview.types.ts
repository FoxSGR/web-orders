import { Observable } from 'rxjs';

import { Id } from '@web-orders/api-interfaces';
import { Entity } from '../../models/entity';
import { WOItemMap } from '../../wo-common.types';
import { EntityType } from '../../types';

interface AbstractEntityPreviewItem<T extends Entity = Entity> {
  value?: string | object | Date | (() => Observable<any> | any) | Array<any>;
  label?: string;
  icon?: string | (() => string);
  valueType?: 'prop' | 'value';
  type?: string;
  hidden?: (entity: Entity) => boolean;
  choices?: WOItemMap;
  preview?: {
    type: EntityType;
    idProp?: string;
    id?: Id;
  };
}

interface EntityPreviewItemTypes<T extends Entity = Entity>
  extends AbstractEntityPreviewItem<T> {
  type?: 'simple' | 'text' | 'color' | 'photo';
}

export interface EntityPreviewItemMap<T extends Entity = Entity>
  extends AbstractEntityPreviewItem<T> {
  type: 'map';
  emptyText: string;
}

export interface EntityPreviewItemTable<T extends Entity = Entity>
  extends AbstractEntityPreviewItem<T> {
  type: 'table';
  emptyText: string;
  columns: {
    label: string;
    prop: string;
  }[];
}

export type EntityPreviewItem<T extends Entity = Entity> =
  | EntityPreviewItemTypes
  | EntityPreviewItemMap
  | EntityPreviewItemTable;

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
