import { EntityPreviewConfig, ShoeComponent } from '../common';
import { shoeComponentConstants } from './shoe-component.constants';

export const shoeComponentPreviewConfig: (
  entity: ShoeComponent,
) => EntityPreviewConfig = entity => ({
  header: {
    title: 'str.common.component',
    subTitle: `${entity.id} - ${entity.reference || entity.name || ''}`,
  },
  groups: [
    {
      header: {
        title: 'str.dialogs.preview.overview',
      },
      columns: 1,
      items: [
        {
          icon: 'document',
          label: 'str.common.reference',
          value: 'reference',
        },
        {
          icon: 'document', // TODO: get a better icon
          label: 'str.common.description',
          value: 'name',
        },
        {
          icon: shoeComponentConstants.types[entity.type]?.icon,
          label: 'str.common.type',
          value: 'type',
          choices: shoeComponentConstants.types,
        },
        {
          icon: shoeComponentConstants.ornamentTypes[entity.ornamentType!]
            ?.icon,
          label: 'str.shoeComponent.ornaments.ornamentType',
          value: 'ornamentType',
          hidden: <ShoeComponent>(component) => component?.type !== 'ornament',
          choices: shoeComponentConstants.ornamentTypes,
        },
      ],
    },
    {
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
  ],
});
