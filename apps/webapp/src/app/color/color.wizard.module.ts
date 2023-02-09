import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { createEntityWizardRoutes } from '../common';

@NgModule({
  imports: [RouterModule.forChild(createEntityWizardRoutes('color'))],
})
export class ColorWizardModule {}
