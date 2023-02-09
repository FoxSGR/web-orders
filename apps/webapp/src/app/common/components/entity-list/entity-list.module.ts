import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ColorIndicatorComponent } from '../elements';

import { EntityListDropdownComponent } from './entity-list-dropdown.component';
import { EntityListComponent } from './entity-list.component';

import * as cells from './cells';

@NgModule({
  declarations: [
    EntityListDropdownComponent,
    EntityListComponent,
    cells.AdvancedCellComponent,
    cells.BasicCellComponent,
    cells.FlagCellComponent,
    cells.ChoiceCellComponent,
    cells.ColorCellComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    FormsModule,
    NgxDatatableModule,
    ColorIndicatorComponent,
  ],
  exports: [EntityListComponent],
})
export class EntityListModule {}
