import { Component, Inject } from '@angular/core';

@Component({
  template: ` test `,
})
export class BasicCellComponent {
  constructor(@Inject('data') data) {
    console.log(data)
  }
}
