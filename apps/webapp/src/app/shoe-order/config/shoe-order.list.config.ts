import {
  AdvancedCellComponent,
  DatePipe,
  inlineFlag,
  ListCellComponent,
  PhotoCellComponent,
  ShoeOrder,
} from '../../common';
import { EntityListConfig } from '../../common/components/entity-list/entity-list.types';

export const shoeOrderListConfig: EntityListConfig<ShoeOrder> = {
  title: 'str.shoeOrder.common.orders',
  searchables: [
    {
      label: 'str.model.common.reference',
      prop: 'sample.sampleModel.reference',
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
      prop: 'sample.sampleModel.components.component.reference',
    },
    {
      label: 'str.shoeComponent.common.componentDescription',
      prop: 'sample.sampleModel.components.component.name',
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
      name: 'str.model.common.models',
      prop: 'samples',
      sortable: true,
      canAutoResize: false,
      width: 100,
      template: ListCellComponent,
      summaryTemplate: {
        titleProp: 'sample.sampleModel.reference',
        trackByProp: 'sample.id',
      },
    },
    {
      name: 'str.common.pairs',
      prop: 'totalPairs',
      sortable: true,
      canAutoResize: false,
      width: 100,
    },
    {
      name: 'str.client.common.client',
      prop: 'sample.client.name',
      sortable: true,
      canAutoResize: true,
      summaryTemplate: [
        {
          name: 'str.client.common.client',
          prop: 'samples.0.sample.client.name',
          inline: entity =>
            inlineFlag(entity, 'samples.0.sample.client.address.country'),
        },
        {
          name: 'str.agent.common.agent',
          prop: 'samples.0.sample.agent.name',
          inline: entity =>
            inlineFlag(entity, 'samples.0.sample.agent.address.country'),
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
  ],
};
