import {
  AfterViewInit,
  Directive,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

import { adjustModalHeight } from '../../util';

@Directive()
export abstract class AbstractModalComponent implements OnInit, AfterViewInit {
  @Input() modal: HTMLIonModalElement;

  /**
   * Whether the preview was dismissed.
   * @private
   */
  private dismissed = false;

  ngOnInit() {
    this.modal?.onDidDismiss().then(() => (this.dismissed = true));
  }

  ngAfterViewInit() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => this.adjustScroll(), (i + 1) * 300);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustScroll();
  }

  /**
   * Closes the preview.
   */
  close() {
    this.modal.dismiss();
  }

  private adjustScroll() {
    if (this.dismissed || !this.modal) {
      return;
    }

    adjustModalHeight(this.modal);
  }
}
