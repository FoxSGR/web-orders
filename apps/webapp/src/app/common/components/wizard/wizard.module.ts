import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import {
  ColumnChangesService,
  DimensionsHelper,
  ScrollbarHelper,
} from '@swimlane/ngx-datatable';

import { RoutedWizardComponent } from './routed-wizard/routed-wizard.component';
import { RoutedStepComponent } from './routed-wizard/routed-step.component';

import { SmartFormModule } from '../smart-form/smart-form.module';
import { StandaloneWizardComponent } from './standalone-wizard/standalone-wizard.component';
import { StandaloneStepComponent } from './standalone-wizard/standalone-step.component';
import { StandaloneWizardModalComponent } from './standalone-wizard/standalone-wizard-modal.component';

@NgModule({
  declarations: [
    RoutedWizardComponent,
    RoutedStepComponent,
    StandaloneWizardComponent,
    StandaloneStepComponent,
    StandaloneWizardModalComponent,
  ],
  exports: [
    RoutedWizardComponent,
    StandaloneWizardComponent,
    StandaloneWizardModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    RouterModule,
    SmartFormModule,
  ],
  providers: [
    // Start: necessary injections for ngx-datatable to work in modals
    ScrollbarHelper,
    DimensionsHelper,
    ColumnChangesService,
    // End: necessary injections for ngx-datatable to work in modals
  ],
})
export class WizardModule {}
