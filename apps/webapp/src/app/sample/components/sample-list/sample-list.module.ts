import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';

import { WOCommonModule } from '../../../common';

import * as components from './components';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    WOCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: components.SampleListComponent,
        data: {
          showSearch: true,
        },
      },
    ]),
    IonicModule,
  ],
  declarations: [components.SampleListComponent],
  exports: [components.SampleListComponent],
})
export class SampleListModule {}
