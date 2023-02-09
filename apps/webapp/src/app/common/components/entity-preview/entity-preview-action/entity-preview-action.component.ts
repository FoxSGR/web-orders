import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

import { WOActionItem } from '../../../wo-common.types';

@Component({
  selector: 'wo-entity-preview-action',
  templateUrl: './entity-preview-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityPreviewActionComponent {
  @Output() edit = new EventEmitter();
  @Output() print = new EventEmitter();

  actions: WOActionItem[] = [
    {
      label: 'str.list.actions.edit',
      icon: 'pencil',
      action: () => this.edit.emit(),
    },
    {
      label: 'str.list.actions.print',
      icon: 'print',
      action: () => this.print.emit(),
    },
  ];
}
