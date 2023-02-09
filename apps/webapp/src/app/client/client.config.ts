import {
  Brand,
  Client,
  EntityConfigRegister,
  FlagCellComponent,
  WOEntityConfig,
} from '../common';
import { clientStoreConfig } from './store';
import { ClientService } from './client.service';
import { contactsPreview } from '../address';
import { addressForm, personalForm } from '../address/address.wizard';

@WOEntityConfig<Client>({
  entityType: clientStoreConfig.name,
  label: client => client.name,
  route: 'client',
  serviceClass: ClientService,
  listConfig: {
    searchables: [
      {
        label: 'str.common.name',
        prop: 'name',
      },
      {
        label: 'str.agent.common.agent',
        prop: 'agent.name',
      },
      {
        label: 'str.brand.common.brand',
        prop: 'brands.name',
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
        canAutoResize: false,
      },
      {
        name: 'str.agent.common.agent',
        prop: 'agent.name',
        sortable: true,
        canAutoResize: false,
      },
      {
        name: 'str.brand.common.brand',
        prop: 'brands.0.name',
        sortable: true,
        canAutoResize: true,
      },
      {
        name: 'str.common.location.country',
        prop: 'address.country',
        canAutoResize: false,
        width: 80,
        template: FlagCellComponent,
      },
    ],
  },
  previewConfig: entity => {
    const brandConfig = EntityConfigRegister.getDefinition<Brand>('brand');

    return {
      header: {
        title: 'str.client.common.client',
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
            {
              icon: 'hand-left',
              label: 'str.agent.common.agent',
              value: 'agent.name',
            },
            {
              icon: 'reader',
              label: 'str.common.notes',
              value: 'notes',
              type: 'text',
            },
          ],
        },
        ...((entity.brands
          ? [
              {
                type: 'items',
                showIndex: true,
                header: {
                  title: 'str.common.brands',
                  icon: 'bag',
                },
                emptyText: 'str.client.preview.brands.empty',
                items: entity.brands.map(brand => ({
                  icon: 'bag',
                  label: 'str.common.brand',
                  value: `${brand.id} - ${brandConfig.label(brand)}`,
                  valueType: 'value',
                })),
              },
            ]
          : []) as any),
        contactsPreview,
      ],
    };
  },
  wizardConfig: {
    messages: {
      save: 'str.client.wizard.messages.save.message',
    },
    header: {
      creating: 'str.client.wizard.header.creating',
      updating: 'str.client.wizard.header.updating',
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
              placeholder: 'str.client.wizard.name.placeholder',
              required: true,
            },
            agent: {
              type: 'entity-select',
              label: 'str.agent.common.agent',
              entityName: 'agent',
              config: {
                selection: 'single',
              },
            },
            ...personalForm.items,
            address: {
              type: 'group',
              label: 'str.common.address.address',
              children: {
                ...addressForm.items,
              },
            },
          },
        },
      },
    },
  },
})
export class ClientConfig {}
