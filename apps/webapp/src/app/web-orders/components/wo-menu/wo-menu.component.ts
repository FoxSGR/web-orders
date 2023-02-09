import { Component } from '@angular/core';
import { MenuButton, MenuItem } from './menu-item';
import { Store } from '@ngrx/store';
import { WebOrdersState } from '../../web-orders.types';
import { logout } from '../../../account';

@Component({
  selector: 'wo-menu',
  templateUrl: './wo-menu.component.html',
  styleUrls: ['./wo-menu.component.scss'],
})
export class WOMenuComponent {
  items: MenuItem[] = [
    {
      type: 'button',
      icon: 'log-out-outline',
      label: 'str.account.logout',
      onClick: () => this.store.dispatch(logout()),
    } as MenuButton,
  ];

  constructor(private store: Store<WebOrdersState>) {}
}
