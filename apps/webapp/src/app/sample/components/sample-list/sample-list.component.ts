import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  AdvancedCellComponent,
  DatePipe,
  EntityListConfig,
  ShoeSample,
} from '../../../common';
import { sampleStoreConfig } from '../../store';
import { SampleService } from '../../sample.service';
import { SamplePreviewComponent } from '../sample-preview/sample-preview.component';
import { countries } from '@web-orders/api-interfaces';

@Component({
  selector: 'wo-sample-list',
  templateUrl: './sample-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleListComponent {
  @Input() showSearch = false;

  config: EntityListConfig<ShoeSample> = {
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
    service: this.entityService,
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
        summaryTemplate: [
          {
            name: 'str.client.common.client',
            prop: 'client.name',
            inline: (entity: ShoeSample) => this.inlineFlag(entity, 'client'),
          },
          {
            name: 'str.agent.common.agent',
            prop: 'agent.name',
            inline: (entity: ShoeSample) => this.inlineFlag(entity, 'agent'),
          },
        ],
        template: AdvancedCellComponent,
      },
      {
        name: 'str.sample.common.requestedAt',
        prop: 'dateAsked',
        sortable: true,
        flexGrow: 2,
        pipe: new DatePipe(),
        width: 120,
        canAutoResize: false,
      },
      {
        name: 'str.common.photo',
        prop: 'photo',
        sortable: true,
        canAutoResize: false,
      },
    ],
  };

  constructor(private readonly entityService: SampleService) {}

  private inlineFlag(entity: ShoeSample, field: string) {
    const countryCode = entity[field]?.address?.country?.toLowerCase();
    if (!countryCode) {
      return '';
    }

    const countryName = countries[countryCode];
    return `<span class="fi fi-${countryCode}" title="${countryName}"></span>`;
  }
}
