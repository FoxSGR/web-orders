import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DatePipe } from '../../pipes';

import { ColorIndicatorComponent } from '../elements';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

import * as components from './components';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    NgxDatatableModule,
    DatePipe,
    ColorIndicatorComponent,
    ThumbnailComponent,
  ],
  declarations: [
    components.EntityPreviewActionComponent,
    components.EntityPreviewListComponent,
    components.EntityPreviewGroupComponent,
    components.EntityPreviewTitleComponent,
    components.EntityPreviewItemComponent,
    components.EntityPreviewItemColorComponent,
    components.EntityPreviewItemMapComponent,
    components.EntityPreviewItemPhotoComponent,
    components.EntityPreviewItemSimpleComponent,
    components.EntityPreviewItemTableComponent,
    components.EntityPreviewComponent,
    components.EntityPreviewCompareComponent,
    components.EntityPreviewEmptyTextComponent,
  ],
  exports: [
    components.EntityPreviewComponent,
    components.EntityPreviewCompareComponent,
  ],
})
export class EntityPreviewModule {}
