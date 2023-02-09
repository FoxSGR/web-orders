import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SmartFormComponent } from './smart-form.component';

@NgModule({
  declarations: [SmartFormComponent],
  exports: [SmartFormComponent],
  imports: [CommonModule, IonicModule],
})
export class SmartFormModule {}
