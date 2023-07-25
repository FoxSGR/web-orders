import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wo-brands',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandComponent {}
