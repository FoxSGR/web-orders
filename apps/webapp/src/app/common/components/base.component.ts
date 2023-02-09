import {
  ChangeDetectorRef,
  Directive,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Logger } from '../services';
import { WebOrdersState } from '../../web-orders';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    // inject only the injector so that subclasses only need to pass 1 parameter
    injector: Injector,
  ) {
    this.store = injector.get(Store);
    this.logger = injector.get(Logger);
    this.translate = injector.get(TranslateService);
    this.cdr = injector.get(ChangeDetectorRef);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
  }
}
