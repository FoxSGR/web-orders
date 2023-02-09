import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFindParams } from '@web-orders/api-interfaces';
import { Color, EntityPage, EntityService } from '../common';
import { ClientService } from '../client';

@Injectable({ providedIn: 'root' })
export class ColorService extends EntityService<Color> {
  constructor(http: HttpClient) {
    super(http, {
      entityClass: Color,
      route: 'color',
      alwaysLoadRelations: true,
    });
  }
}
