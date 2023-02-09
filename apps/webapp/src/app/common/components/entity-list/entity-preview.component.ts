import { Directive, Input } from '@angular/core';

import { Entity } from '../../models/entity';

@Directive()
export class EntityPreviewComponent<T extends Entity> {
  @Input() entity: T;
}
