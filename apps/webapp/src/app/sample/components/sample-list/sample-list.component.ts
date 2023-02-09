import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';

import { ShoeSample } from '../../../common';
import { sampleStoreConfig } from '../../store';
import { SampleService } from '../../sample.service';
import { EntityListComponent } from '../../../common';
import { SamplePreviewComponent } from '../sample-preview/sample-preview.component';

@Component({
  selector: 'wo-sample-list',
  templateUrl:
    '../../../common/components/entity-list/entity-list.component.html',
  styleUrls: [
    '../../../common/components/entity-list/entity-list.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleListComponent extends EntityListComponent<ShoeSample> {
  constructor(injector: Injector, entityService: SampleService) {
    super(injector, {
      entityName: sampleStoreConfig.name,
      service: entityService,
      preview: {
        component: SamplePreviewComponent,
      },
      columns: [
        {
          name: 'Id',
          prop: 'id',
          sortable: true,
          canAutoResize: false,
          width: 70,
        },
        {
          name: 'str.model.common.reference',
          prop: 'baseModel.reference',
          sortable: true,
          canAutoResize: false,
        },
        {
          name: 'str.client.common.client',
          prop: 'client.name',
          sortable: true,
          canAutoResize: false,
        },
        {
          name: 'str.sample.common.requestedAt',
          prop: 'dateAsked',
          sortable: true,
          canAutoResize: true,
          flexGrow: 2,
        },
        {
          name: 'str.common.photo',
          prop: 'dateAsked',
          sortable: true,
          canAutoResize: false,
        },
      ],
    });
  }
}
