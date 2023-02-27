import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';

import { EntityPreviewAbstractItemComponent } from '../entity-preview-abstract-item.component';
import { EntityPreviewItemTable } from '../../entity-preview.types';
import { Observable } from 'rxjs';

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

    console.log(this.item.value);
    this.value(this.item).subscribe(value => {
      console.log(value);
    });
  }

  /**
   * Whether dark theme is enabled.
   * @returns
   */
  isDarkTheme(): Observable<boolean> {
    return this.themeService.darkTheme$;
  }
}
