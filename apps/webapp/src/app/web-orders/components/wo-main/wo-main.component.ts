import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';

import { WOAppService } from '../../service/wo-app.service';
import { WebOrdersState } from '../../web-orders.types';
import { MenuItem } from './menu-item';
import { getAccountState, logout } from '../../../account';
import { DialogService, padWithSlashes, ThemeService } from '../../../common';

// init services
import '../../../common/services/history.service';

@Component({
  selector: 'wo-main',
  templateUrl: './wo-main.component.html',
  styleUrls: ['./wo-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WOMainComponent {
  /**
   * The current user.
   */
  user$ = this.store.select(getAccountState).pipe(map(acc => acc?.account));

  /**
   * The current route url.
   */
  route$ = this.router.events.pipe(
    filter(event => event instanceof NavigationStart),
    map(event => (event as NavigationStart).url),
  );

  /**
   * Main items in the menu.
   */
  menuItems: MenuItem[] = [
    {
      icon: 'home',
      label: 'str.menu.home',
      route: 'home',
    },
    {
      icon: 'camera',
      label: 'str.menu.sample',
      route: 'sample',
    },
    {
      icon: 'cube',
      label: 'str.menu.orders',
      route: 'shoe-order',
    },
    {
      label: 'str.menu.more',
      icon: 'add',
      children: [
        {
          icon: 'hardware-chip',
          label: 'str.menu.components',
          route: 'shoe-component',
        },
        {
          icon: 'people',
          label: 'str.menu.clients',
          route: 'client',
        },
        {
          icon: 'hand-left',
          label: 'str.menu.agents',
          route: 'agent',
        },
        {
          icon: 'brush',
          label: 'str.menu.colors',
          route: 'color',
        },
      ],
    },
  ];

  /**
   * Items in the bottom part of the menu.
   */
  bottomItems: MenuItem[] = [
    {
      icon: 'log-out',
      label: 'str.account.logout',
      onClick: () =>
        this.dialogService.confirm(() =>
          this.store.dispatch(logout({ mode: 'manual' })),
        ),
    },
  ];

  /**
   * Whether dark mode is enabled.
   */
  get darkTheme$() {
    return this.themeService.darkTheme$;
  }

  trackByRoute = (_index: number, item: MenuItem) => item.route;

  constructor(
    private store: Store<WebOrdersState>,
    private router: Router,
    private appService: WOAppService,
    private themeService: ThemeService,
    private dialogService: DialogService,
  ) {}

  toggleMenu(): void {
    this.appService.toggleMenu();
  }

  onItemClick(item: MenuItem) {
    if (item.route) {
      this.router.navigate([item.route]);
    } else if (item.onClick) {
      item.onClick();
    }
  }

  routeMatches(item: MenuItem, currentRoute: string | null) {
    if (!item.route) {
      return;
    }

    if (!currentRoute) {
      currentRoute = this.router.url;
    }

    currentRoute = padWithSlashes(currentRoute);
    const itemRoute = padWithSlashes(item.route);

    return currentRoute.includes(itemRoute);
  }
}
