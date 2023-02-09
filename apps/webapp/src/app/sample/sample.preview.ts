import {
  EntityPreviewConfig,
  EntityPreviewItemGroup,
  ShoeSample,
} from '../common';
import { shoeComponentConstants } from '../shoe-component';

export const samplePreview: (
  entity: ShoeSample,
) => EntityPreviewConfig = entity => ({
  header: {
    title: 'str.sample.common.sample',
    subTitle: entity.id,
  },
  groups: [
    {
      header: {
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
        },
        {
          icon: 'people',
          label: 'str.client.common.client',
          value: 'client.name',
        },
        {
          icon: 'hand-left',
          label: 'str.agent.common.agent',
          value: 'agent.name',
        },
      ],
    },
    {
      columns: 1,
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
      header: {
        title: 'str.model.common.model',
        subTitle: entity.sampleModel?.reference,
      },
      columns: 1,
      showIndex: true,
      type: 'groups',
      items: buildComponentGroups(entity),
      emptyText: 'str.sample.preview.components.empty',
    },
  ],
});

const buildComponentGroups: (entity: ShoeSample) => EntityPreviewItemGroup[] = (
  entity: ShoeSample,
) => {
  if (!entity.sampleModel) {
    return [];
  }

  return entity.sampleModel.groupComponents().map(group => ({
    items: group.components.map(v => ({
      icon: shoeComponentConstants.types[v.component.type].icon,
      value: {
        'str.shoeComponent.types.ornament.type':
          v.component.type === 'ornament'
            ? `str.shoeComponent.types.${v.component.ornamentType}.label`
            : undefined,
        'str.shoeComponent.common.reference': v.component.reference,
        'str.shoeComponent.common.name': v.component.name,
        'str.color.common.color': v.color?.name,
      },
      label: shoeComponentConstants.types[v.component.type].label,
      valueType: 'value',
    })),
  }));
};
