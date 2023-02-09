import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'wo-entity-preview-action',
  template: `
    <ion-fab
      vertical="bottom"
      horizontal="end"
      slot="fixed"
      style="position: fixed; bottom: 75px;"
    >
      <ion-fab-button color="secondary">
        <ion-icon name="chevron-up-circle"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button (click)="print.emit()">
          <ion-icon name="print"></ion-icon>
        </ion-fab-button>
        <ion-fab-button (click)="edit.emit()">
          <ion-icon name="pencil"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityPreviewActionComponent {
  @Output() edit = new EventEmitter();
  @Output() print = new EventEmitter();
}
