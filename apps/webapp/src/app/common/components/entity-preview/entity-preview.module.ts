import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { DatePipe } from '../../pipes';

import { EntityPreviewComponent } from './entity-preview.component';
import { EntityPreviewActionComponent } from './entity-preview-action.component';
import { EntityPreviewListComponent } from './entity-preview-list/entity-preview-list.component';
import { EntityPreviewGroupComponent } from './entity-preview-group/entity-preview-group.component';
import { EntityPreviewCompareComponent } from './entity-preview-compare/entity-preview-compare.component';
import { ColorIndicatorComponent } from '../elements';
import { RouterModule } from '@angular/router';
import { EntityPreviewPageComponent } from './entity-preview-page/entity-preview-page.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    DatePipe,
    ColorIndicatorComponent,
    RouterModule.forChild([
      {
        path: ':entityType/:id',
        component: EntityPreviewPageComponent,
      },
    ]),
  ],
  declarations: [
    EntityPreviewActionComponent,
    EntityPreviewListComponent,
    EntityPreviewGroupComponent,
    EntityPreviewComponent,
    EntityPreviewCompareComponent,
    EntityPreviewPageComponent,
  ],
  exports: [
    EntityPreviewComponent,
    EntityPreviewListComponent,
    EntityPreviewCompareComponent,
  ],
})
export class EntityPreviewModule {}