import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { WOAppService } from '../../service/wo-app.service';
import { WebOrdersState } from '../../web-orders.types';
import { MenuItem } from './menu-item';
import { getAccount, logout } from '../../../account';

@Component({
  selector: 'wo-main',
  templateUrl: './wo-main.component.html',
  styleUrls: ['./wo-main.component.scss'],
})
export class WOMainComponent {
  user$ = this.store.select(getAccount).pipe(map((acc) => acc?.user));

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
      route: 'order',
    },
    {
      icon: 'people',
      label: 'str.menu.management',
      route: 'management',
    },
    {
      icon: 'log-out',
      label: 'str.account.logout',
      onClick: () => this.store.dispatch(logout()),
    },
  ];

  constructor(
    private store: Store<WebOrdersState>,
    private router: Router,
    private appService: WOAppService
  ) {}

  toggleMenu(): void {
    this.appService.toggleMenu();
  }

  onItemClick(item: MenuItem) {
    if (item.route) {
      this.navigate(item.route);
    } else if (item.onClick) {
      item.onClick();
    }
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
