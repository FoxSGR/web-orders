import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { EntityEffects, ShoeSample } from '../../common';
import { SampleService } from '../sample.service';
import { sampleStoreConfig } from './sample.store';

/**
 * Account related effects.
 */
@Injectable({
  providedIn: 'root',
})
export class SampleEffects extends EntityEffects<ShoeSample> {
  wizard$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(this.entityActions.wizard),
        tap(({ id }) => this.router.navigate(['sample/wizard/_'])),
      ),
    { dispatch: false },
  );

  constructor(
    store: Store,
    actions: Actions,
    sampleService: SampleService,
    private router: Router,
  ) {
    super(store, actions, sampleService, sampleStoreConfig.name);
  }
}
