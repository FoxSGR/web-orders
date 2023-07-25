import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wo-colors',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorComponent {}
