import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityListModule } from '../common';

@Component({
  selector: 'wo-color-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, EntityListModule],
  template: `<wo-entity-list
    [entityType]="'color'"
    [standalone]="true"
  ></wo-entity-list>`,
})
export class ColorListComponent {}
