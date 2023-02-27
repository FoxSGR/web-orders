import { Component } from '@angular/core';

import { EntityPreviewAbstractItemComponent } from './entity-preview-abstract-item.component';
import { EntityPreviewItem } from '../entity-preview.types';

@Component({
  selector: 'wo-entity-preview-item',
  templateUrl: './entity-preview-item.component.html',
})
export class EntityPreviewItemComponent<
  T extends EntityPreviewItem,
> extends EntityPreviewAbstractItemComponent<T> {
  /**
   * Returns the icon for the given item.
   * @param item
   */
  icon(item: EntityPreviewItem): string | undefined {
    if (!item.icon) {
      return;
    }

    return typeof item.icon === 'function' ? item.icon() : item.icon;
  }
}
