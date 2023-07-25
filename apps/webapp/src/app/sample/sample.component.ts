import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wo-samples',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleComponent {}
