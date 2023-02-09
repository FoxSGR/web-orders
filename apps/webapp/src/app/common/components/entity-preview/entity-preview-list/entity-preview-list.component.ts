import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  EntityPreviewColumns,
  EntityPreviewItem,
} from '../entity-preview.types';

@Component({
  selector: 'wo-entity-preview-list',
  templateUrl: './entity-preview-list.component.html',
  styleUrls: ['./entity-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityPreviewListComponent {
  @Input()
  model!: any;

  @Input()
  items: EntityPreviewItem[];

  @Input()
  columns?: EntityPreviewColumns;

  @Input()
  indexed = false;
}
