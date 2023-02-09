import { Component, Injector } from '@angular/core';

import { BaseViewComponent, ThemeService } from '../../../common';
import { WOAppService } from '../../service/wo-app.service';

@Component({
  selector: 'wo-container',
  templateUrl: './wo-container.component.html',
  styleUrls: ['./wo-container.component.scss'],
})
export class WOContainerComponent extends BaseViewComponent {
  override requiresAuth = true;

  /**
   * Whether the app is in printing mode.
   */
  get printMode() {
    return this.themeService.printMode;
  }

  constructor(injector: Injector, private appService: WOAppService, private themeService: ThemeService) {
    super(injector);
  }

  toggleMenu() {
    this.appService.toggleMenu();
  }
}
