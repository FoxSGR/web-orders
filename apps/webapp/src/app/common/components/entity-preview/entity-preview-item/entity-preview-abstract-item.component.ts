import { Directive, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { get } from 'lodash';

import { EntityPreviewItem } from '../entity-preview.types';
import {
  EntityPreviewService,
  FileService,
  ThemeService,
} from '../../../services';

@Directive()
export class EntityPreviewAbstractItemComponent<
  T extends EntityPreviewItem = EntityPreviewItem,
> {
  @Input()
  item: T;

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
    protected translate: TranslateService,
    protected fileService: FileService,
    protected themeService: ThemeService,
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
