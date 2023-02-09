import { Component, Input } from '@angular/core';

import {
  EntityPreviewGroupGroup,
  EntityPreviewItemGroup,
} from '../entity-preview.types';
import { BaseComponent } from '../../base.component';
import { Entity } from '../../../models/entity';

@Component({
  selector: 'wo-entity-preview-group',
  templateUrl: './entity-preview-group.component.html',
  styleUrls: ['./entity-preview-group.component.scss'],
})
export class EntityPreviewGroupComponent<
  T extends Entity,
> extends BaseComponent {
  @Input() group: EntityPreviewItemGroup | EntityPreviewGroupGroup;
  @Input() entity: T;
}
