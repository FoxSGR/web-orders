import { EntityFormWizard } from '../../common/types';

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
            execute: state => {
              let totalPairs = 0;

              for (const amount of Object.values(state.values['sizes'] || {})) {
                if (typeof amount === 'number') {
                  totalPairs += amount;
                }
              }

              // price per pair
              // total price

              return {
                totalPairs: {
                  label: 'str.shoeOrder.common.totalPairs',
                  value: totalPairs,
                },
              };
            },
          },
        },
      },
    },
  },
};
