import { TranslateService } from '@ngx-translate/core';

import { EntityFormWizard } from '../../common/types';
import { ShoeSample } from '../../common';

const sizes: string[] = [];
for (let i = 34; i < 45; i += 0.5) {
  sizes.push(`${i}`.replace('.', ','));
}

/**
 * Structure definition of the shoe-order wizard.
 */
export const shoeOrderWizard: EntityFormWizard = {
  messages: {
    save: 'str.shoeOrder.wizard.messages.save.message',
  },
  header: {
    creating: 'str.shoeOrder.wizard.header.creating',
    updating: 'str.shoeOrder.wizard.header.updating',
    icon: 'cube',
  },
  steps: {
    base: {
      title: 'str.shoeOrder.wizard.base.header',
      route: 'base',
      form: {
        items: {
          sample: {
            type: 'entity-select',
            label: 'str.sample.common.sample',
            entityName: 'sample',
            config: {
              selection: 'single',
            },
            required: true,
            loadOnSelect: true,
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
    sizes: {
      title: 'str.shoeOrder.wizard.sizes.header',
      route: 'sizes',
      form: {
        items: {
          sizes: {
            label: 'str.shoeOrder.wizard.sizes.label',
            type: 'map',
            keys: sizes,
            value: {
              type: 'number-input',
              min: 0,
              placeholder: 'str.shoeOrder.wizard.sizes.placeholder',
            },
          },
          preview: {
            type: 'info-box',
            label: 'str.shoeOrder.wizard.preview.header',
            execute: (state, injector) => {
              let totalPairs = 0;

              for (const amount of Object.values(state.values['sizes'] || {})) {
                if (typeof amount === 'number') {
                  totalPairs += amount;
                }
              }

              const translate = injector.get(TranslateService);
              let amountsNotSetMessage = '';
              if (totalPairs === 0) {
                amountsNotSetMessage = translate.instant(
                  'str.shoeOrder.wizard.preview.sizesNotSet',
                );
              }

              const formatter = Intl.NumberFormat();
              let costPerPairValue: string | number;
              let totalCostValue: string | number;

              let sample = state.values['sample']?.[0] as ShoeSample;
              if (sample) {
                sample = new ShoeSample(sample);
                const costPerPair = sample.sampleModel?.calculatePrice() || 0;
                costPerPairValue = formatter.format(costPerPair) + ' €';
                if (totalPairs !== 0) {
                  totalCostValue =
                    formatter.format(costPerPair * totalPairs) + ' €';
                } else {
                  totalCostValue = amountsNotSetMessage;
                }
              } else {
                const sampleNotSetMessage = translate.instant(
                  'str.shoeOrder.wizard.preview.sampleNotSet',
                );
                costPerPairValue = sampleNotSetMessage;
                totalCostValue = sampleNotSetMessage;
              }

              return {
                totalPairs: {
                  label: 'str.shoeOrder.common.totalPairs',
                  value: totalPairs
                    ? formatter.format(totalPairs)
                    : amountsNotSetMessage,
                },
                costPerPair: {
                  label: 'str.common.costPerPair',
                  value: costPerPairValue,
                },
                totalCost: {
                  label: 'str.common.totalCost',
                  value: totalCostValue,
                },
              };
            },
          },
        },
      },
    },
  },
};
