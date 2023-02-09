import { Component, Injector } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

import { Tab } from './wo-tabs.types';
import { BaseViewComponent } from '../../../common';

@Component({
  selector: 'wo-container',
  templateUrl: './wo-tabs.component.html',
  styleUrls: ['./wo-tabs.component.scss'],
})
export class WOTabsComponent extends BaseViewComponent {
  tabs: Tab[] = [
    {
      id: 'home',
      title: 'str.toolbar.home',
      icon: 'home',
    },
    {
      id: 'sample',
      title: 'str.toolbar.sample',
      icon: 'camera',
    },
    {
      id: 'orders',
      title: 'str.toolbar.orders',
      icon: 'cube',
    },
    {
      id: 'management',
      title: 'str.toolbar.management',
      icon: 'people',
    },
  ];

  currentTab = this.tabs[0];

  override requiresAuth = true;

  constructor(
    private injector: Injector,
    private menuController: MenuController,
    public platform: Platform,
  ) {
    super(injector);
  }

  openMenu(): void {
    this.menuController.open();
  }
}
