import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wo-orders',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoeOrderComponent {}
