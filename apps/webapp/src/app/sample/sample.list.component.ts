import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityListModule } from '../common';

@Component({
  selector: 'wo-sample-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, EntityListModule],
  template: `<wo-entity-list
    [entityType]="'sample'"
    [standalone]="true"
  ></wo-entity-list>`,
})
export class SampleListComponent {}
