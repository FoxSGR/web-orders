import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ShoeComponent, EntityService } from '../common';

@Injectable({ providedIn: 'root' })
export class ShoeComponentService extends EntityService<ShoeComponent> {
  constructor(http: HttpClient) {
    super(http, {
      entityClass: ShoeComponent,
      route: 'shoe-component',
      alwaysLoadRelations: true,
    });
  }
}
