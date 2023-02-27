import {
  EntityPreviewGenerator,
  EntityPreviewItem,
  ShoeOrder,
} from '../../common';

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
    {
      columns: print ? 2 : 1,
      items: [
        {
          icon: 'calendar',
          label: 'str.sample.common.dateAsked',
          value: 'dateAsked',
        },
        {
          icon: 'calendar',
          label: 'str.sample.common.dateDelivery',
          value: 'dateDelivery',
        },
        {
          icon: 'calendar',
          label: 'str.common.deadline',
          value: 'deadline',
        },
      ],
    },
    {
      type: 'items',
      columns: 1,
      items: [
        {
          icon: 'reader',
          label: 'str.common.notes',
          value: 'notes',
          type: 'text',
        },
      ],
    },
    {
      type: 'items',
      header: print
        ? undefined
        : {
            title: 'str.common.photos',
            icon: 'camera',
          },
      items:
        order.sample.sampleModel?.photos
          ?.map(
            photo =>
              ({
                type: 'photo',
                value: photo,
                label: photo.name,
              } as EntityPreviewItem),
          )
          ?.slice(0, print ? 1 : order.sample.sampleModel?.photos.length) || [],
      emptyText: 'str.sample.preview.photos.empty',
    },
    {
      header: {
        title: 'str.common.pairs',
      },
      columns: 1,
      items: [
        {
          icon: 'footsteps',
          value: buildSizesValue(order),
          valueType: 'value',
          type: 'table',
          emptyText: 'str.shoeOrder.preview.sizes.empty',
          columns: [
            {
              label: 'str.common.size',
              prop: 'size',
            },
            {
              label: 'str.common.amount',
              prop: 'amount',
            },
          ],
        },
      ],
    },
  ],
});

const buildSizesValue = (order: ShoeOrder) => {
  let total = 0;
  const sizes: any[] = [];

  for (let i = 34; i < 45; i += 0.5) {
    if (order.sizes[i] || Number.isInteger(i)) {
      const amount = order.sizes[i] || 0;

      sizes.push({
        size: i,
        amount,
      });

      total += amount;
    }
  }

  if (total === 0) {
    return undefined;
  }

  return sizes;
};
