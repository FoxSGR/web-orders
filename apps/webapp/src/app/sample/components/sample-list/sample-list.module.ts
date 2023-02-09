import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import * as components from './components';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NgxDatatableModule,
    TranslateModule,
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  declarations: [
    components.SampleListComponent,
    components.BasicCellComponent,
  ],
  exports: [components.SampleListComponent],
})
export class SampleListModule {}
