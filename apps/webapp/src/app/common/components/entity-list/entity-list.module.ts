import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EntityListDropdownComponent } from './entity-list-dropdown.component';
import { EntityListComponent } from './entity-list.component';

@NgModule({
  declarations: [EntityListDropdownComponent, EntityListComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [EntityListComponent],
})
export class EntityListModule {}
