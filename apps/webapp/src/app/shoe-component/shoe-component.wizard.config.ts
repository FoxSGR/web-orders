import { EntityFormWizard } from '../common/types';
import { ShoeComponent } from '../common';
import { shoeComponentConstants } from './shoe-component.constants';

export const shoeComponentWizardConfig: EntityFormWizard<ShoeComponent> = {
  messages: {
    save: 'str.shoeComponent.wizard.messages.save.message',
  },
  header: {
    creating: 'str.shoeComponent.wizard.header.creating',
    updating: 'str.shoeComponent.wizard.header.updating',
    icon: 'hardware-chip',
  },
  steps: {
    base: {
      route: 'base',
      form: {
        items: {
          reference: {
            type: 'text-input',
            label: 'str.common.reference',
            placeholder: 'str.shoeComponent.wizard.reference.placeholder',
          },
          name: {
            type: 'text-input',
            label: 'str.common.description',
            placeholder: 'str.shoeComponent.wizard.description.placeholder',
          },
          type: {
            type: 'choices',
            label: 'str.common.type',
            choices: shoeComponentConstants.types,
            required: true,
          },
          ornamentType: {
            type: 'choices',
            label: 'str.shoeComponent.ornaments.ornamentType',
            hidden: state => state.values['type'] !== 'ornament',
            choices: shoeComponentConstants.ornamentTypes,
          },
        },
      },
    },
  },
};
