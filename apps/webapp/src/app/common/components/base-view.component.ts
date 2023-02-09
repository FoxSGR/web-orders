import { Directive, Injector, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BaseComponent } from './base.component';
import { getAccount } from '../../account';

/**
 * A template for views in the apps.
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class BaseViewComponent extends BaseComponent implements OnInit {
  /**
   * Whether the page requires the user to be authenticated to access it.
   */
  @Input()
  requiresAuth = false;

  /**
   * The route of the page.
   */
  @Input()
  route?: string;

  /**
   * The query params on the active page.
   * @private
   */
  private queryParams?: ParamMap;

  /**
   * The router of the application.
   * @private
   */
  protected readonly router: Router;

  /**
   * The current route.
   * @private
   */
  private readonly activatedRoute: ActivatedRoute;

  constructor(
    // inject only the injector so that subclasses only need to pass 1 parameter
    injector: Injector,
  ) {
    super(injector);
    this.router = injector.get(Router);
    this.activatedRoute = injector.get(ActivatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    // get the query params
    this.activatedRoute.queryParamMap
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((queryParams) => (this.queryParams = queryParams));

    // check auth requirements
    this.checkAuth();
  }

  /**
   * Checks if the page requires the user to be authenticated.
   * @private
   */
  private checkAuth(): void {
    if (!this.requiresAuth) {
      return;
    }

    this.store
      .select(getAccount)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((account) => {
        if (account.user) {
          return;
        }

        const encoded = encodeURIComponent(this.router.url);
        this.router.navigate(['login', { callback: encoded }]);
      });
  }
}
