import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Client, EntityService } from '../common';

@Injectable({ providedIn: 'root' })
export class ClientService extends EntityService<Client> {
  constructor(http: HttpClient) {
    super(http, {
      entityClass: Client,
      route: 'client',
      alwaysLoadRelations: true,
    });
  }
}
