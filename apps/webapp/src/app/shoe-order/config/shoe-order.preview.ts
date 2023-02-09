import { EntityPreviewGenerator, ShoeOrder } from '../../common';

export const shoeOrderPreview: EntityPreviewGenerator<ShoeOrder> = (
  order,
  print,
) => ({
  header: {
    title: 'str.shoeOrder.common.order',
    subTitle: order.id,
  },
  groups: [
    {
      header: print
        ? undefined
        : {
            title: 'str.dialogs.preview.overview',
          },
      items: [
        {
          icon: 'camera',
          label: 'str.sample.common.sample',
          value: () =>
            order.sample?.sampleModel?.reference
              ? `${order.sample.id} - ${order.sample.sampleModel.reference}`
              : '',
          preview: {
            type: 'sample',
            idProp: 'sample.id',
          },
        },
        {
          icon: 'bag',
          label: 'str.brand.common.brand',
          value: 'sample.brand.name',
          preview: {
            type: 'brand',
            idProp: 'sample.brand.id',
          },
        },
        {
          icon: 'people',
          label: 'str.client.common.client',
          value: 'sample.client.name',
          preview: {
            type: 'client',
            idProp: 'sample.client.id',
          },
        },
        {
          icon: 'hand-left',
          label: 'str.agent.common.agent',
          value: 'sample.agent.name',
          preview: {
            type: 'agent',
            idProp: 'sample.agent.id',
          },
        },
      ],
    },
  ],
});
