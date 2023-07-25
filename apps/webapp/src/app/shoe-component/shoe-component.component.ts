import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wo-shoe-components',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoeComponentComponent {}
