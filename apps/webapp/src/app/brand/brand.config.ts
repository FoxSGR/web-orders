import { Brand, WOEntityConfig } from '../common';
import { brandStoreConfig } from './store';
import { BrandService } from './brand.service';

@WOEntityConfig<Brand>({
  entityType: brandStoreConfig.name,
  label: brand => brand.name,
  icon: 'bag',
  route: 'brand',
  serviceClass: BrandService,
  listConfig: {
    title: 'str.brand.common.brands',
    searchables: [
      {
        label: 'str.common.name',
        prop: 'name',
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
        name: 'str.common.name',
        prop: 'name',
        sortable: true,
        canAutoResize: true,
      },
    ],
  },
  previewConfig: entity => ({
    header: {
      title: 'str.brand.common.brand',
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
            icon: 'document',
            label: 'str.common.name',
            value: 'name',
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
})
export class BrandConfig {}
