import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'wo-entity-preview-close',
  template: `
    <div style="position: absolute; right: 6px; top: 6px">
      <ion-buttons slot="end">
        <ion-button class="wo-close-modal-button" (click)="click.emit()">
          <ion-icon slot="icon-only" icon="close"></ion-icon>
        </ion-button>
      </ion-buttons>
    </div>
  `,
})
export class EntityPreviewCloseComponent {
  @Output()
  click = new EventEmitter();
}
