import { Injectable } from '@angular/core';
import { EntityService, ShoeSample } from '../common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SampleService extends EntityService<ShoeSample> {
  constructor(http: HttpClient) {
    super(http, { route: 'shoe-sample', alwaysLoadRelations: true });
  }
}
