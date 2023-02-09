import { Directive, Input } from '@angular/core';
import { get } from 'lodash';

import { EntityPreviewItem } from '../entity-preview.types';
import { EntityPreviewService, FileService } from '../../../services';
import { Observable } from 'rxjs';

@Directive()
export class EntityPreviewAbstractItemComponent {
  @Input()
  item: EntityPreviewItem;

  @Input()
  model: any;

  @Input()
  index: number;

  @Input()
  showIndex: boolean;

  /**
   * Color for the preview elements.
   */
  previewColor = 'dark';

  constructor(
    private previewService: EntityPreviewService,
    protected fileService: FileService,
  ) {}

  /**
   * Returns the value for the given item.
   * @param item
   */
  value(item: EntityPreviewItem): Observable<any> {
    return this.previewService.itemValue(item, this.model);
  }

  /**
   * Previews the given item.
   * @param item
   */
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
