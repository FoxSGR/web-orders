import { Component } from '@angular/core';
import { SmartForm } from '../../../../../common/components/smart-form/smart-form.types';
import { sampleListConfig } from '../../../../sample.list.config';

@Component({
  templateUrl: './sample-wizard-base.component.html',
})
export class SampleWizardBaseComponent {
  config: SmartForm = {
    items: [
      {
        type: 'entity-select',
        config: {
          ...sampleListConfig,
          selection: 'single'
        }
      }
    ]
  }
}
