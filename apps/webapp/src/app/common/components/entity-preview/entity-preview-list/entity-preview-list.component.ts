import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import {
  EntityPreviewColumns,
  EntityPreviewItem,
} from '../entity-preview.types';
import { Entity } from '../../../models/entity';
import { EntityPreviewService } from '../../../services';

@Component({
  selector: 'wo-entity-preview-list',
  templateUrl: './entity-preview-list.component.html',
  styleUrls: ['./entity-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityPreviewListComponent<T extends Entity> {
  @Input()
  model!: T;

  @Input()
  items: EntityPreviewItem[];

  @Input()
  columns?: EntityPreviewColumns;

  @Input()
  indexed = false;

  constructor(private previewService: EntityPreviewService) {}

  icon(item: EntityPreviewItem): string {
    return typeof item.icon === 'function' ? item.icon() : item.icon;
  }

  value(item: EntityPreviewItem): Observable<string> {
    return this.previewService.itemValue(item, this.model);
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object';
  }

  objectEntries(val: any): [string, string][] {
    return Object.entries(val).filter(([, value]) => !!value) as [
      string,
      string,
    ][];
  }
}
