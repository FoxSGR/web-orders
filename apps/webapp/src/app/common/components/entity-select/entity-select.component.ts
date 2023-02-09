import { Component, Input } from '@angular/core';

import { Entity } from '../../models/entity';
import { EntityListConfig } from '../entity-list';

@Component({
  selector: 'wo-entity-select',
  templateUrl: './entity-select.component.html',
})
export class EntitySelectComponent<T extends Entity> {
  @Input() config: EntityListConfig<T>;
}
