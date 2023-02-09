import { Component } from '@angular/core';

import { StepperOptions } from '../../../../../common';

@Component({
  selector: 'wo-sample-wizard',
  templateUrl: './sample-wizard.component.html',
  styleUrls: ['./sample-wizard.component.scss'],
})
export class SampleWizardComponent {
  stepperOptions: StepperOptions = {
    steps: [
      {
        name: 'Base', // TODO: String
        route: 'base',
      },
      {
        name: 'Modelo', // TODO: String,
        route: 'model',
      },
      {
        name: 'Anexos', // TODO: String
        route: 'attachments',
      },
    ],
  };
}
