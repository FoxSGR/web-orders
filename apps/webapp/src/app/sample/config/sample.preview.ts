import {
  EntityPreviewConfig,
  EntityPreviewItem,
  EntityPreviewItemGroup,
  ShoeModelComponent,
  ShoeSample,
} from '../../common';
import { componentTypeConfigs } from '@web-orders/api-interfaces';

export const samplePreview: (
  entity: ShoeSample,
  print: boolean,
) => EntityPreviewConfig = (entity, print) => ({
  header: {
    title: 'str.sample.common.sample',
    subTitle: entity.id,
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
          icon: 'construct',
          label: 'str.model.common.model',
          value: 'sampleModel.reference',
        },
        {
          icon: 'bag',
          label: 'str.brand.common.brand',
          value: 'brand.name',
          preview: {
            type: 'brand',
            idProp: 'brand.id',
          },
        },
        {
          icon: 'people',
          label: 'str.client.common.client',
          value: 'client.name',
          preview: {
            type: 'client',
            idProp: 'client.id',
          },
        },
        {
          icon: 'hand-left',
          label: 'str.agent.common.agent',
          value: 'agent.name',
          preview: {
            type: 'agent',
            idProp: 'agent.id',
          },
        },
      ],
    },
    {
      columns: print ? 2 : 1,
      items: [
        {
          icon: () => {
            if (entity.sampleModel?.season === 'fall_winter') {
              return 'rainy';
            } else {
              return 'sunny';
            }
          },
          label: 'str.sample.common.season',
          value: () => {
            let tr = '';
            const key = entity.sampleModel?.season;
            if (key === 'fall_winter') {
              tr = 'str.sample.season.fallWinter';
            } else if (key === 'spring_summer') {
              tr = 'str.sample.season.springSummer';
            }

            return tr;
          },
        },
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
        entity.sampleModel?.photos
          ?.map(
            photo =>
              ({
                type: 'photo',
                value: photo,
                icon: 'camera',
                label: photo.name,
              } as EntityPreviewItem),
          )
          ?.slice(0, print ? 1 : entity.sampleModel.photos.length) || [],
      emptyText: 'str.sample.preview.photos.empty',
    },
    {
      header: {
        title: 'str.model.common.model',
        subTitle: entity.sampleModel?.reference,
      },
      columns: 1,
      showIndex: true,
      type: 'groups',
      items: buildComponentGroups(entity, print),
      emptyText: 'str.sample.preview.components.empty',
    },
  ],
});

const buildComponentGroups: (
  entity: ShoeSample,
  print: boolean,
) => EntityPreviewItemGroup[] = (entity: ShoeSample, print: boolean) => {
  if (!entity.sampleModel) {
    return [];
  }

  if (print) {
    if (!entity.sampleModel.components) {
      return [];
    }

    return [
      {
        items: entity.sampleModel.components.map(component =>
          buildComponentItem(component, print),
        ),
      },
    ];
  } else {
    return entity.sampleModel.groupComponents().map(group => ({
      showIndex: true,
      columns: group.components.length > 1 ? 2 : 1,
      items: group.components.map(v => buildComponentItem(v, print)),
    }));
  }
};

const buildComponentItem = (
  shoeModelComponent: ShoeModelComponent,
  print: boolean,
  index?: number,
) => {
  let indexSuffix = '';
  if (index) {
    indexSuffix = ` ${index}`;
  }

  const componentConfig =
    componentTypeConfigs[shoeModelComponent.component.type];

  const amountField: any = {};
  if (componentConfig.unit && shoeModelComponent.amount) {
    let key = 'str.common.amount';
    if (componentConfig.unit === 'size') {
      key = 'str.common.size';
    }

    let unit = '';
    if (!['amount', 'size'].includes(componentConfig.unit)) {
      unit = ` ${componentConfig.unit}`;
    }

    amountField[key] = `${shoeModelComponent.amount}${unit}`;
  }

  return {
    icon: componentConfig.icon,
    value: {
      'str.shoeComponent.types.ornament.type':
        shoeModelComponent.component.type === 'ornament'
          ? `str.shoeComponent.types.${shoeModelComponent.component.ornamentType}.label`
          : undefined,
      'str.shoeComponent.common.reference':
        shoeModelComponent.component.reference,
      'str.shoeComponent.common.name': shoeModelComponent.component.name,
      'str.color.common.color': shoeModelComponent.color?.name,
      'str.common.price':
        print || !shoeModelComponent.price
          ? undefined
          : shoeModelComponent.price + ' €',
      ...amountField,
      'str.common.notes': shoeModelComponent.component.notes,
    },
    label: componentConfig.label + indexSuffix,
    valueType: 'value',
    preview: {
      type: 'shoe-component',
      id: shoeModelComponent.component.id,
    },
  } as EntityPreviewItem;
};
