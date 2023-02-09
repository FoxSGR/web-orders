import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { EntitySelectComponent } from './entity-select.component';
import { EntityListModule } from '../entity-list';

@NgModule({
  declarations: [EntitySelectComponent],
  exports: [EntitySelectComponent],
  imports: [IonicModule, EntityListModule],
})
export class EntitySelectModule {}
