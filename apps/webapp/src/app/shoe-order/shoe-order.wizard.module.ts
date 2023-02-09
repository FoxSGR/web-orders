import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { createEntityWizardRoutes } from '../common';

@NgModule({
  imports: [RouterModule.forChild(createEntityWizardRoutes('shoe-order'))],
})
export class ShoeOrderWizardModule {}
