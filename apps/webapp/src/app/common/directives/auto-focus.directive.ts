import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { IonInput } from '@ionic/angular';

/**
 * Directive to automatically focus an element.
 */
@Directive({
  selector: '[woAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef, private host: IonInput) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.host.setFocus(), 150);
  }
}
