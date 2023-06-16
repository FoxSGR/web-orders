import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EntityPreviewAbstractItemComponent } from '../entity-preview-abstract-item.component';

@Component({
  selector: 'wo-entity-preview-item-color',
  templateUrl: './entity-preview-item-color.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityPreviewItemColorComponent extends EntityPreviewAbstractItemComponent {}
