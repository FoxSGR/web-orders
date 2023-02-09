import {
  AdvancedCellComponent,
  DatePipe,
  inlineFlag,
  PhotoCellComponent,
  ShoeSample,
} from '../../common';
import { EntityListConfig } from '../../common/components/entity-list/entity-list.types';

export const sampleListConfig: EntityListConfig<ShoeSample> = {
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
      label: 'str.shoeComponent.common.componentReference',
      prop: 'sampleModel.components.component.reference',
    },
    {
      label: 'str.shoeComponent.common.componentDescription',
      prop: 'sampleModel.components.component.name',
    },
    {
      label: 'str.common.notes',
      prop: 'notes',
    },
  ],
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
          inline: (entity: ShoeSample) =>
            inlineFlag(entity, 'client.address.country'),
        },
        {
          name: 'str.agent.common.agent',
          prop: 'agent.name',
          inline: (entity: ShoeSample) =>
            inlineFlag(entity, 'agent.address.country'),
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
      prop: 'sampleModel.photos',
      sortable: false,
      canAutoResize: false,
      template: PhotoCellComponent,
      width: 150,
    },
  ],
};
