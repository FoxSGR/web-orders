import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';

import { BaseViewComponent } from '../../../common';
import { WOAppService } from '../../service/wo-app.service';

@Component({
  selector: 'wo-container',
  templateUrl: './wo-container.component.html',
  styleUrls: ['./wo-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WOContainerComponent extends BaseViewComponent {
  override requiresAuth = true;

  constructor(injector: Injector, private appService: WOAppService) {
    super(injector);
  }

  toggleMenu() {
    this.appService.toggleMenu();
  }
}
