import {
  ChangeDetectorRef,
  Directive,
  Injector,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Logger } from '../services';
import { WebOrdersState } from '../../web-orders';
import { takeUntil } from 'rxjs/operators';

/**
 * A template for the components.
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class BaseComponent implements OnInit, OnDestroy {
  /**
   * Used when the component is destroyed.
   * @protected
   */
  protected ngDestroyed$ = new Subject<void>();

  /**
   * The redux store.
   * @protected
   */
  protected readonly store: Store<WebOrdersState>;

  /**
   * The application logger.
   * @protected
   */
  protected readonly logger: Logger;

  /**
   * The translate service.
   * @protected
   */
  protected readonly translate: TranslateService;

  /**
   * Change detector.
   * @protected
   */
  protected readonly cdr: ChangeDetectorRef;

  /**
   * View container for quicker queries.
   * @protected
   */
  protected readonly vcr: ViewContainerRef;

  /**
   * Comparator to keep the original order of items in the config.
   */
  originalOrder = () => 0;

  /**
   * Track by function to track by id.
   * @param _index
   * @param item
   */
  trackById = (_index: number, item: any) => item.id;
  trackByKey = (_index: number, item: any) => item.key;
  trackByUid = (_index: number, item: any) => item._uid || item.uid;

  constructor(
    // inject only the injector so that subclasses only need to pass 1 parameter
    protected injector: Injector,
  ) {
    this.store = injector.get(Store);
    this.logger = injector.get(Logger);
    this.translate = injector.get(TranslateService);
    this.cdr = injector.get(ChangeDetectorRef);
    this.vcr = injector.get(ViewContainerRef);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    /* maybe this will be used here in the future */
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
  }

  /**
   * Serializes an object into json. Useful for debugging.
   * @param object
   */
  json(object: any): string {
    return JSON.stringify(object);
  }

  protected syncRouteData(route: ActivatedRoute, keys: string[]) {
    route.data.pipe(takeUntil(this.ngDestroyed$)).subscribe(data =>
      keys.forEach(key => {
        if (key in data) {
          this[key] = data[key];
        } else {
          delete this[key];
        }
      }),
    );
  }
}
