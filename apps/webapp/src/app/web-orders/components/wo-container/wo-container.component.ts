import { Component, Injector } from '@angular/core';

import { BaseViewComponent } from '../../../common';
import { WOAppService } from '../../service/wo-app.service';

@Component({
  selector: 'wo-container',
  templateUrl: './wo-container.component.html',
  styleUrls: ['./wo-container.component.scss'],
})
export class WOContainerComponent extends BaseViewComponent {
  override requiresAuth = true;

  constructor(private injector: Injector, private appService: WOAppService) {
    super(injector);
  }

  toggleMenu(): void {
    this.appService.toggleMenu();
  }
}
