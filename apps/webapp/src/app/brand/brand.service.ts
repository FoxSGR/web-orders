import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFindParams } from '@web-orders/api-interfaces';
import { Brand, EntityPage, EntityService } from '../common';

@Injectable({ providedIn: 'root' })
export class BrandService extends EntityService<Brand> {
  constructor(http: HttpClient) {
    super(http, {
      entityClass: Brand,
      route: 'brand',
      alwaysLoadRelations: true,
    });
  }

  findClientBrands(
    clientId: number,
    params: IFindParams<Brand>,
  ): Observable<EntityPage<Brand>> {
    const route = clientId ? `client/${clientId}/brand` : undefined;
    return this.findPage(params, route).pipe(
      map(page => {
        const universal = page.extra?.['universal'] || [];

        return {
          ...page,
          total: page.total + universal.length,
          size: page.items.length + universal.length,
          items: [...page.items, ...universal],
        };
      }),
    );
  }
}
