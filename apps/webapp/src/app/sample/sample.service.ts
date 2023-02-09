import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFindParams } from '@web-orders/api-interfaces';
import { Client, createParams, EntityService, ShoeSample } from '../common';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SampleService extends EntityService<ShoeSample> {
  constructor(http: HttpClient) {
    super(http, {
      entityClass: ShoeSample,
      route: 'shoe-sample',
      alwaysLoadRelations: true,
    });
  }

  getTopClients(params: IFindParams<Client>): Observable<Client[]> {
    this.createParams(params);

    return this.http
      .get(`${environment.apiUrl}/shoe-sample/top/clients`, {
        params: createParams(params),
      })
      .pipe(map((data: any) => data.items));
  }
}
