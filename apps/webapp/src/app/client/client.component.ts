import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wo-clients',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent {}
