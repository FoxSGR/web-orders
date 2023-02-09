import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';

import { DatePipe, ShoeSample } from '../../../common';
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
      searchables: [
        {
          label: 'str.model.common.reference',
          prop: 'sampleModel.reference',
        },
        {
          label: 'str.client.common.client',
          prop: 'client.name',
        },
        {
          label: 'str.agent.common.agent',
          prop: 'agent.name',
        },
        {
          label: 'str.brand.common.brand',
          prop: 'brand.name',
        },
        {
          label: 'str.common.notes',
          prop: 'notes',
        },
      ],
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
          width: 50,
        },
        {
          name: 'str.model.common.model',
          prop: 'sampleModel.reference',
          sortable: true,
          canAutoResize: false,
          width: 75,
        },
        {
          name: 'str.client.common.client',
          prop: 'client.name',
          sortable: true,
          canAutoResize: true,
        },
        {
          name: 'str.sample.common.requestedAt',
          prop: 'dateAsked',
          sortable: true,
          flexGrow: 2,
          pipe: new DatePipe(),
          width: 90,
          canAutoResize: false,
        },
        {
          name: 'str.common.photo',
          prop: 'photo',
          sortable: true,
          canAutoResize: false
        },
      ],
    });
  }
}
