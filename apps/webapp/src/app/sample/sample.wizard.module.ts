import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { createEntityWizardRoutes } from '../common';

@NgModule({
  imports: [RouterModule.forChild(createEntityWizardRoutes('sample'))],
})
export class SampleWizardModule {}