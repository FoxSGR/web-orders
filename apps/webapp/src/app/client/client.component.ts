import { Component } from '@angular/core';

@Component({
  selector: 'wo-clients',
  template: `
    <ion-content class="ion-padding">
      <router-outlet></router-outlet>
    </ion-content>
  `,
})
export class ClientComponent {}
