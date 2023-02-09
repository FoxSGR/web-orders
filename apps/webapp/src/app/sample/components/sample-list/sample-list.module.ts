import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { WOCommonModule } from '../../../common';

import * as components from './components';

@NgModule({
  imports: [NgxDatatableModule, WOCommonModule],
  declarations: [components.SampleListComponent],
  exports: [components.SampleListComponent],
})
export class SampleListModule {}
