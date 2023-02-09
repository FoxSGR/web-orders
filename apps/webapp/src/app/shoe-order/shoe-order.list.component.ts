import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityListModule } from '../common';

@Component({
  selector: 'wo-shoe-order-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, EntityListModule],
  template: `<wo-entity-list
    [entityType]="'shoe-order'"
    [standalone]="true"
  ></wo-entity-list>`,
})
export class ShoeOrderListComponent {}
