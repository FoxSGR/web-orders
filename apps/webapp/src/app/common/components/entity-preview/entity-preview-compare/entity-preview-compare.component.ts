import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Entity } from '../../../models/entity';
import { EntityType } from '../../../types';
import { AbstractModalComponent } from '../../abstract-modal/abstract-modal.component';

@Component({
  selector: 'wo-entity-preview-compare',
  templateUrl: './entity-preview-compare.component.html',
  styleUrls: ['./entity-preview-compare.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityPreviewCompareComponent<
  T extends Entity,
> extends AbstractModalComponent {
  @Input() entityType: EntityType;

  @Input() left: T;
  @Input() leftLabel: string;

  @Input() right: T;
  @Input() rightLabel: string;

  @Input() onPick: (pick: 'left' | 'right') => void;
}
