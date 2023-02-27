import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'wo-entity-preview-empty-text',
  template: `
    <ion-label>
      <p>
        {{ value | translate }}
      </p>
    </ion-label>
  `,
  styles: [
    `
      :host.inline {
        &,
        ion-label,
        p {
          display: inline;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityPreviewEmptyTextComponent {
  @Input() value: string;
  @Input() inline = true;
  @HostBinding('class.inline') inlineClass = this.inline;
}
