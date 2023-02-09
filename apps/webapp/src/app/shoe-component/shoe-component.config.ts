import { ChoiceCellComponent, ShoeComponent, WOEntityConfig } from '../common';
import { shoeComponentStoreConfig } from './store';
import { ShoeComponentService } from './shoe-component.service';
import { shoeComponentConstants } from './shoe-component.constants';
import { shoeComponentPreviewConfig } from './shoe-component.preview.config';
import { shoeComponentWizardConfig } from './shoe-component.wizard.config';

@WOEntityConfig<ShoeComponent>({
  entityType: shoeComponentStoreConfig.name,
  label: shoeComponent => shoeComponent.reference,
  route: 'shoe-component',
  serviceClass: ShoeComponentService,
  listConfig: {
    searchables: [
      {
        label: 'str.common.reference',
        prop: 'reference',
      },
      {
        label: 'str.common.description',
        prop: 'name',
      },
      {
        label: 'str.common.type',
        prop: 'type',
        choices: shoeComponentConstants.types,
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
        name: 'str.common.reference',
        prop: 'reference',
        sortable: true,
        canAutoResize: false,
      },
      {
        name: 'str.common.type',
        prop: 'type',
        sortable: true,
        canAutoResize: false,
        template: ChoiceCellComponent,
        choices: shoeComponentConstants.types,
        width: 200,
      },
      {
        name: 'str.shoeComponent.ornaments.ornamentType',
        prop: 'ornamentType',
        sortable: true,
        canAutoResize: true,
        template: ChoiceCellComponent,
        choices: shoeComponentConstants.ornamentTypes,
        hide: shoeComponent => shoeComponent.type !== 'ornament',
      },
    ],
  },
  previewConfig: shoeComponentPreviewConfig,
  wizardConfig: shoeComponentWizardConfig,
})
export class ShoeComponentListConfig {}
