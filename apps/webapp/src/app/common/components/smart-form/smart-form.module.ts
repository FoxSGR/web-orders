import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { EntityListModule } from '../entity-list';
import { SelectSearchComponent } from '../select-search';

import { DatePipe } from '../../pipes';

import * as components from './components';
import { ColorIndicatorComponent } from '../elements';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

@NgModule({
  declarations: [
    components.SmartFormComponent,
    components.SmartFormTextInputComponent,
    components.SmartFormTextAreaComponent,
    components.SmartFormChoicesComponent,
    components.SmartFormNumberInputComponent,
    components.SmartFormDateComponent,
    components.SmartFormEntitySelectComponent,
    components.SmartFormFileUploadComponent,
    components.SmartFormPhoneInputComponent,
    components.SmartFormColorComponent,
    components.SmartFormMapComponent,
    components.SmartFormGroupComponent,
    components.SmartFormItemComponent,
    components.SmartFormMultipleComponent,
  ],
  exports: [components.SmartFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EntityListModule,
    SelectSearchComponent,
    DatePipe,
    ColorIndicatorComponent,
    ThumbnailComponent,
  ],
})
export class SmartFormModule {}
