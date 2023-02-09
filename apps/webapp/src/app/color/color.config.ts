import { Color, ColorCellComponent, WOEntityConfig } from '../common';
import { colorStoreConfig } from './store';
import { ColorService } from './color.service';

@WOEntityConfig<Color>({
  entityType: colorStoreConfig.name,
  label: color => color.name,
  icon: 'brush',
  route: 'color',
  serviceClass: ColorService,
  listConfig: {
    searchables: [
      {
        label: 'str.common.name',
        prop: 'name',
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
        name: 'str.common.name',
        prop: 'name',
        sortable: true,
        canAutoResize: true,
      },
      {
        name: 'str.common.color',
        prop: '',
        sortable: false,
        canAutoResize: false,
        template: ColorCellComponent,
        width: 60,
      },
    ],
  },
  previewConfig: entity => ({
    header: {
      title: 'str.color.common.color',
      subTitle: entity.id,
    },
    groups: [
      {
        header: {
          title: 'str.dialogs.preview.overview',
        },
        columns: 1,
        items: [
          {
            icon: 'brush',
            label: 'str.common.color',
            type: 'color',
            value: '',
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
  }),
  wizardConfig: {
    messages: {
      save: 'str.color.wizard.messages.save.message',
    },
    header: {
      creating: 'str.color.wizard.header.creating',
      updating: 'str.color.wizard.header.updating',
      icon: 'people',
    },
    steps: {
      base: {
        route: 'base',
        form: {
          items: {
            name: {
              type: 'text-input',
              label: 'str.common.name',
              placeholder: 'str.color.wizard.name.placeholder',
              required: true,
            },
            color: {
              type: 'color',
              label: 'str.common.color',
            },
          },
        },
      },
    },
  },
})
export class ColorConfig {}
