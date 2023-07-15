import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ColorIndicatorComponent } from '../elements';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

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
    cells.ListCellComponent,
    cells.ChoiceCellComponent,
    cells.ColorCellComponent,
    cells.PhotoCellComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    FormsModule,
    NgxDatatableModule,
    ColorIndicatorComponent,
    ThumbnailComponent,
  ],
  exports: [EntityListComponent],
})
export class EntityListModule {}
