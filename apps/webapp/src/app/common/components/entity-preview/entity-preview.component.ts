import {
  AfterViewInit,
  Directive,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import type { Entity } from '../../models/entity';

@Directive()
export abstract class EntityPreviewComponent<T extends Entity>
  implements OnInit, AfterViewInit
{
  @Input() entity: T;
  @Input() modal: HTMLIonModalElement;

  private dismissed = false;

  constructor(protected translate: TranslateService) {}

  ngOnInit() {
    this.modal.onDidDismiss().then(() => (this.dismissed = true));
  }

  ngAfterViewInit() {
    setTimeout(() => this.adjustScroll(), 300);
    setTimeout(() => this.adjustScroll(), 600);
    setTimeout(() => this.adjustScroll(), 900);
    setTimeout(() => this.adjustScroll(), 1200);
    setTimeout(() => this.adjustScroll(), 1500);
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustScroll();
  }

  close() {
    this.modal.dismiss();
  }

  edit() {
    this.modal.dismiss();
  }

  private adjustScroll() {
    if (this.dismissed) {
      return;
    }

    const content = this.modal.querySelector('ion-content');
    const page: HTMLElement | null = this.modal.querySelector('.ion-page');
    if (content && page) {
      const height = window.innerHeight - page.getBoundingClientRect().top;
      content.style.height = `${height}px`;
    }
  }
}
