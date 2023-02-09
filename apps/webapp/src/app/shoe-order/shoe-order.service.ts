import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityService, ShoeOrder } from '../common';

@Injectable({ providedIn: 'root' })
export class ShoeOrderService extends EntityService<ShoeOrder> {
  constructor(http: HttpClient) {
    super(http, {
      entityClass: ShoeOrder,
      route: 'shoe-order',
      alwaysLoadRelations: true,
    });
  }
}
