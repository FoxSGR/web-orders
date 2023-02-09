import { Component } from '@angular/core';
import { EntityPreviewAbstractItemComponent } from '../entity-preview-abstract-item.component';

@Component({
  selector: 'wo-entity-preview-item-map',
  templateUrl: './entity-preview-item-map.component.html',
})
export class EntityPreviewItemMapComponent extends EntityPreviewAbstractItemComponent {
  /**
   * Returns the entries of the given object.
   * @param val
   */
  objectEntries(val: any): [string, string][] {
    return Object.entries(val).filter(
      ([, value]) => !!value || value === 0,
    ) as [string, string][];
  }
}
