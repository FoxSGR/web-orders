import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'wo-entity-preview-action',
  template: `
    <ion-fab
      vertical="bottom"
      horizontal="end"
      slot="fixed"
      style="position: fixed; bottom: 75px;"
    >
      <ion-fab-button color="secondary" (click)="edit.emit()">
        <ion-icon name="pencil"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  `,
})
export class EntityPreviewActionComponent {
  @Output()
  edit = new EventEmitter();
}
