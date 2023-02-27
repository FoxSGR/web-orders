import { Component, Input } from '@angular/core';

@Component({
  selector: 'wo-entity-preview-title',
  template: `
    <p *ngIf="label" style="display: inline; font-weight: 500" class="m0">
      {{ label | translate }}
      <span *ngIf="showIndex">
        {{ index + 1 }}
      </span>
      <span style="margin-left: -0.2em">:</span>
    </p>
  `,
})
export class EntityPreviewTitleComponent {
  @Input() label?: string;
  @Input() showIndex: boolean;
  @Input() index: number;
}
