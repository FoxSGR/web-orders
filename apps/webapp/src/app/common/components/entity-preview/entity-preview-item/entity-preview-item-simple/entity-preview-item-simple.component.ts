import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EntityPreviewAbstractItemComponent } from '../entity-preview-abstract-item.component';

@Component({
  selector: 'wo-entity-preview-item-simple',
  templateUrl: './entity-preview-item-simple.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityPreviewItemSimpleComponent extends EntityPreviewAbstractItemComponent {}
