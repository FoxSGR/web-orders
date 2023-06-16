import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';

import { EntityPreviewAbstractItemComponent } from '../entity-preview-abstract-item.component';
import { EntityPreviewItemTable } from '../../entity-preview.types';

@Component({
  selector: 'wo-entity-preview-item-table',
  templateUrl: './entity-preview-item-table.component.html',
  styleUrls: ['./entity-preview-item-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityPreviewItemTableComponent
  extends EntityPreviewAbstractItemComponent<EntityPreviewItemTable>
  implements OnInit
{
  columns!: TableColumn[];

  ngOnInit() {
    this.columns = this.item.columns.map(column => ({
      prop: column.prop,
      name: this.translate.instant(column.label),
    }));
  }

  /**
   * Whether dark theme is enabled.
   * @returns
   */
  isDarkTheme(): Observable<boolean> {
    return this.themeService.darkTheme$;
  }
}
