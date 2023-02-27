import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EntityPreviewAbstractItemComponent } from '../entity-preview-abstract-item.component';
import { FileData } from '../../../../types';

@Component({
  selector: 'wo-entity-preview-item-photo',
  templateUrl: './entity-preview-item-photo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityPreviewItemPhotoComponent extends EntityPreviewAbstractItemComponent {
  /**
   * Returns the file url for the given file data.
   * @param fileData
   */
  fileUrl(fileData: FileData): string {
    return this.fileService.buildUrl(fileData);
  }
}
