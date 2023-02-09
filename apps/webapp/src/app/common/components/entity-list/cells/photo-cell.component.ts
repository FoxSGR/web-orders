import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';

import { CellComponent } from './cell.component';
import { ENTITY_LIST_TOKEN } from '../entity-list.token';
import { FileService } from '../../../services';
import { FileData } from '../../../types';

@Component({
  template: `
    <wo-thumbnail
      *ngIf="shouldShow() && url && fileData"
      [url]="url!"
      [name]="fileData!.name"
    ></wo-thumbnail>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoCellComponent extends CellComponent implements OnInit {
  fileData?: FileData;
  url?: string;

  constructor(
    @Inject(ENTITY_LIST_TOKEN) data: any,
    private fileService: FileService,
  ) {
    super(data);
  }

  override ngOnInit() {
    super.ngOnInit();
    if (this.shouldShow()) {
      this.buildURL();
    }
  }

  private buildURL() {
    const value: FileData | FileData[] | undefined = this.getValue();
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return;
    }

    let fileData: FileData;
    if (Array.isArray(value)) {
      fileData = value.find(f => f.default) || value[0];
    } else {
      fileData = value;
    }

    this.fileData = fileData;
    this.url = this.fileService.buildUrl(fileData);
  }
}
