import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wo-agents',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentComponent {}
