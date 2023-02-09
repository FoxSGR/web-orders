import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
} from '@angular/core';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';
import { filter } from 'rxjs/operators';

import { BaseComponent, EntityPage, ShoeSample } from '../../../common';
import { sampleActions, sampleSelectors } from '../../store';

@Component({
  selector: 'wo-sample-list',
  templateUrl: './sample-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleListComponent extends BaseComponent implements OnInit {
  rows: ShoeSample[] = [];

  status = 'loading';

  columns: TableColumn[] = [
    {
      name: this.translate.instant('str.model.common.reference'),
      prop: 'baseModel.reference',
      sortable: true,
      canAutoResize: false,
    },
  ];

  page: EntityPage<ShoeSample> = {
    offset: 0,
    size: 0,
    items: [],
    total: 0,
  };

  pageSize = 10;

  ColumnMode = ColumnMode;

  constructor(private injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setPage(0);
    this.store
      .select(sampleSelectors.getPage)
      .pipe(filter((page) => !!page))
      .subscribe((page) => {
        this.page = page as any;
        this.status = 'loaded';
      });
  }

  setPage(page: number): void {
    this.store.dispatch(sampleActions.loadPage({ params: { offset: 0 } }));
  }
}
