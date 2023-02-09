import {
  Agent,
  Brand,
  Client,
  EntityConfigRegister,
  EntityPreviewGroup,
  FlagCellComponent,
  WOEntityConfig,
} from '../common';
import { agentStoreConfig } from './store';
import { AgentService } from './agent.service';
import { addressForm, personalForm } from '../address/address.wizard';
import { contactsPreview } from '../address';

@WOEntityConfig<Agent>({
  entityType: agentStoreConfig.name,
  serviceClass: AgentService,
  label: agent => agent.name,
  icon: 'hand-left',
  route: 'agent',
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
        canAutoResize: false,
      },
      {
        name: 'str.client.common.client',
        prop: 'clients.0.name',
        sortable: true,
        canAutoResize: false,
      },
      {
        name: 'str.brand.common.brand',
        prop: 'clients.0.brands.0.name',
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
    const clientConfig = EntityConfigRegister.getDefinition<Client>('client');

    return {
      header: {
        title: 'str.agent.common.agent',
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
              icon: 'reader',
              label: 'str.common.notes',
              value: 'notes',
              type: 'text',
            },
          ],
        },
        ...((entity.clients
          ? [
              {
                type: 'groups',
                showIndex: true,
                header: {
                  title: 'str.client.common.client',
                  icon: 'people',
                },
                emptyText: 'str.agent.preview.clients.empty',
                items: entity.clients.map(
                  client =>
                    ({
                      type: 'groups',
                      items: [
                        {
                          type: 'items',
                          items: [
                            {
                              label: 'str.client.common.client',
                              icon: 'people',
                              value: `${client.id} - ${clientConfig.label(
                                client,
                              )}`,
                              valueType: 'value',
                            },
                          ],
                        },
                        {
                          type: 'items',
                          showIndex: true,
                          emptyText: 'str.client.preview.brands.empty',
                          items: client.brands.map(brand => ({
                            icon: 'bag',
                            label: 'str.common.brand',
                            value: `${brand.id} - ${brandConfig.label(brand)}`,
                            valueType: 'value',
                          })),
                        } as EntityPreviewGroup,
                      ],
                    } as EntityPreviewGroup),
                ),
              } as EntityPreviewGroup,
            ]
          : []) as any),
        contactsPreview,
      ],
    };
  },
  wizardConfig: {
    messages: {
      save: 'str.agent.wizard.messages.save.message',
    },
    header: {
      creating: 'str.agent.wizard.header.creating',
      updating: 'str.agent.wizard.header.updating',
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
              placeholder: 'str.agent.wizard.name.placeholder',
              required: true,
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
export class AgentConfig {}
