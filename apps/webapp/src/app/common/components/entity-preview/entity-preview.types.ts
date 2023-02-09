import { Observable } from 'rxjs';

import { Entity } from '../../models/entity';
import { WOItemMap } from '../../wo-common.types';

export interface EntityPreviewItem<T extends Entity = Entity> {
  icon: string | (() => string);
  label: string;
  value: string | object | Date | (() => Observable<any> | any);
  valueType?: 'prop' | 'value';
  type?: 'simple' | 'text' | 'color';
  hidden?: (entity: Entity) => boolean;
  choices?: WOItemMap;
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
