import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Entity } from '../../../models/entity';
import { AbstractStepComponent } from '../abstract-wizard/abstract-step.component';
import { EntityConfig, OptionalId } from '../../../types';

@Component({
  selector: 'wo-standalone-step',
  templateUrl: '../abstract-wizard/abstract-step.component.html',
  styleUrls: ['../abstract-wizard/abstract-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandaloneStepComponent<
  T extends Entity,
> extends AbstractStepComponent<T> {
  /**
   * Key of the step.
   */
  @Input()
  override stepKey: string;

  /**
   * Config of the entity type.
   */
  @Input()
  override entityConfig: EntityConfig<T>;

  /**
   * Id of the entity.
   */
  @Input()
  override set id(value: OptionalId) {
    this._id = value || '_';
  }
  override get id(): OptionalId {
    return this._id;
  }
  protected override _id: OptionalId;
}
