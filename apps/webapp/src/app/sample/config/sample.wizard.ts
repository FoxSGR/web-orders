import { LoadingController } from '@ionic/angular';
import { get, isEmpty } from 'lodash';

import {
  componentTypeConfigs,
  IFindParams,
  SeasonType,
} from '@web-orders/api-interfaces';
import {
  Agent,
  Brand,
  Client,
  EntityService,
  FileService,
  shoeSizeChoices,
  WOIconItemMap,
} from '../../common';
import { BrandService } from '../../brand';
import {
  EntityFormWizard,
  SmartForm,
  SmartFormFiles,
  SmartFormMultiple,
  SmartFormState,
} from '../../common/types';
import { TranslateService } from '@ngx-translate/core';

/**
 * Structure definition of the sample wizard.
 */
export const sampleWizard: EntityFormWizard = {
  messages: {
    save: 'str.sample.wizard.messages.save.message',
  },
  header: {
    creating: 'str.sample.wizard.header.creating',
    updating: 'str.sample.wizard.header.updating',
    icon: 'camera',
  },
  steps: {
    base: {
      title: 'str.sample.wizard.base.header',
      route: 'base',
      form: {
        items: {
          client: {
            type: 'entity-select',
            label: 'str.client.common.client',
            entityName: 'client',
            config: {
              selection: 'single',
            },
            required: true,
            onChange: (value: Client[], state: SmartFormState) => {
              const client = value[0];
              if (!client) {
                state.values['agent'] = [];
                if (
                  (state.values['brand']?.[0] as Brand)?.scope !== 'universal'
                ) {
                  state.values['brand'] = [];
                }
                return;
              }

              let agent: Agent[] = [];
              if (client.agent) {
                agent = [client.agent];
              }

              let brand: Brand[] = [];
              if (client.brands?.[0]) {
                brand = [client.brands[0]];
              }

              state.values['agent'] = agent;
              state.values['brand'] = brand;
            },
          },
          agent: {
            type: 'entity-select',
            label: 'str.agent.common.agent',
            entityName: 'agent',
            config: {
              selection: 'single',
            },
            disabled: state => isEmpty(state.values['client']),
          },
          brand: {
            type: 'entity-select',
            label: 'str.brand.common.brand',
            entityName: 'brand',
            config: {
              selection: 'single',
              findPage: (
                service: EntityService<Brand>,
                params: IFindParams<Brand>,
                state: SmartFormState,
              ) => {
                const client = state.values['client']?.[0]?.id;
                return (service as BrandService).findClientBrands(
                  client,
                  params,
                );
              },
            },
            disabled: state => isEmpty(state.values['client']),
          },
          season: {
            type: 'choices',
            label: 'str.sample.common.season',
            required: true,
            choices: {
              spring_summer: {
                label: 'str.sample.season.springSummer',
                icon: 'sunny',
              },
              fall_winter: {
                label: 'str.sample.season.fallWinter',
                icon: 'rainy',
              },
            } as WOIconItemMap<SeasonType>,
            generation: {
              prop: 'sampleModel.season',
            },
          },
          dateAsked: {
            type: 'date',
            label: 'str.sample.common.dateAsked',
            dateType: 'date',
          },
          deadline: {
            type: 'date',
            label: 'str.sample.wizard.deadline.label',
            dateType: 'date',
          },
          dateDelivery: {
            type: 'date',
            label: 'str.sample.common.dateDelivery',
            dateType: 'date',
          },
        },
      },
    },
    model: {
      title: 'str.sample.wizard.model.header',
      route: 'model',
      form: {
        items: {
          reference: {
            type: 'text-input',
            label: 'str.model.common.reference',
            placeholder: 'str.sample.wizard.reference.placeholder',
            required: true,
            generation: {
              prop: 'sampleModel.reference',
            },
          },
          componentsHeader: {
            type: 'header',
            label: 'str.common.components',
          },
        },
      },
    },
    details: {
      title: 'str.sample.wizard.details.header',
      route: 'details',
      form: {
        items: {
          size: {
            type: 'choices',
            label: 'str.common.size',
            choices: shoeSizeChoices,
            searchable: false,
          },
          amount: {
            type: 'number-input',
            label: 'str.common.amount',
            placeholder: 'str.sample.wizard.amount.placeholder',
          },
          photos: {
            type: 'file-upload',
            label: 'str.common.photo',
            mimeType: 'image/*',
            multiple: true,
            maxSizeMB: 5,
            hasDefault: true,
            generation: {
              prop: 'sampleModel.photos',
            },
          },
          notes: {
            type: 'text-area',
            label: 'str.common.notes',
            placeholder: 'str.sample.wizard.notes.placeholder',
          },
        },
      },
    },
  },
  preSave: {
    callback: async (state, injector) => {
      // Upload photos
      const photosToUpload = (
        state.values['photos'] as SmartFormFiles
      )?.files.filter(f => f.state === 'toUpload');
      if (!photosToUpload || photosToUpload.length === 0) {
        return;
      }

      const loadingController = injector.get(LoadingController);
      const translate = injector.get(TranslateService);
      const loading = await loadingController.create({
        message: translate.instant(
          'str.sample.wizard.postSave.uploadingPhotos',
        ),
      });
      loading.present();

      const fileService = injector.get(FileService);
      for (const photo of photosToUpload) {
        try {
          await fileService.uploadFile(photo);
        } catch (e) {
          // ignore, just log
          console.error(e);
        }
      }

      loading.dismiss();
    },
  },
};

/**
 * Creates a smart form item for a shoe component.
 * @param container
 * @param key
 */
const createComponentItem = (container: SmartForm, key: string) => {
  const hidden = (state: SmartFormState, prop: string) => {
    const propParts = prop.split('.');
    const componentProp =
      propParts.slice(0, propParts.length - 1).join('.') + '.component';
    const component = get(state.values, componentProp);
    return !component || component.length === 0;
  };

  const config = componentTypeConfigs[key];

  container.items[key] = {
    type: 'multiple',
    generation: {
      flatten: {
        by: 'component.type',
        to: 'sampleModel.components',
      },
    },
    label: config.label,
    children: {
      type: 'group',
      children: {
        component: {
          type: 'entity-select',
          label: 'str.common.material',
          entityName: 'shoe-component',
          mode: 'modal',
          config: {
            selection: 'single',
          },
        },
        color: {
          type: 'entity-select',
          label: 'str.common.color',
          entityName: 'color',
          mode: 'modal',
          config: {
            selection: 'single',
          },
          hidden,
        },
        ...(config.unit
          ? {
              amount: {
                type: 'number-input',
                label:
                  config.unit === 'size'
                    ? 'str.common.size'
                    : 'str.common.amount',
                placeholder:
                  config.unit === 'size'
                    ? 'str.common.placeholders.materialSize'
                    : 'str.common.placeholders.materialAmount',
                hidden,
                unit: ['amount', 'size'].includes(config.unit)
                  ? undefined
                  : config.unit,
              },
            }
          : {}),
        price: {
          type: 'number-input',
          placeholder: 'str.sample.wizard.component.price.placeholder',
          label: 'str.common.price',
          unit: '€',
          hidden,
        },
        notes: {
          type: 'text-area',
          label: 'str.common.notes',
          placeholder: 'str.common.placeholders.materialNotes',
          hidden,
        },
      },
    },
    default: {},
  } as SmartFormMultiple;
};

Object.keys(componentTypeConfigs).forEach(key =>
  createComponentItem(sampleWizard.steps['model'].form, key),
);
