import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { firstValueFrom, Observable, take } from 'rxjs';
import { get } from 'lodash';

import {
  EntityPreviewColumns,
  EntityPreviewItem,
} from '../entity-preview.types';
import { Entity } from '../../../models/entity';
import { EntityPreviewService, FileService } from '../../../services';
import { FileData } from '../../../types';

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

  constructor(
    private previewService: EntityPreviewService,
    private fileService: FileService,
  ) {}

  icon(item: EntityPreviewItem): string {
    return typeof item.icon === 'function' ? item.icon() : item.icon;
  }

  value(item: EntityPreviewItem): Observable<any> {
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

  fileUrl(fileData: FileData): string {
    return this.fileService.buildUrl(fileData);
  }

  async onClickItem(item: EntityPreviewItem) {
    if (!item.preview) {
      return;
    }

    let id = item.preview.id;
    if (item.preview.idProp) {
      id = get(this.model, item.preview.idProp);
    }
    if (!id) {
      return;
    }

    this.previewService.previewEntity(id, item.preview.type, true);
  }
}
