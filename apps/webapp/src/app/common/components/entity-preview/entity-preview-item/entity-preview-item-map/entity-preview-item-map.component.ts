import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EntityPreviewAbstractItemComponent } from '../entity-preview-abstract-item.component';
import { EntityPreviewItemMap } from '../../entity-preview.types';

@Component({
  selector: 'wo-entity-preview-item-map',
  templateUrl: './entity-preview-item-map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityPreviewItemMapComponent extends EntityPreviewAbstractItemComponent<EntityPreviewItemMap> {}
