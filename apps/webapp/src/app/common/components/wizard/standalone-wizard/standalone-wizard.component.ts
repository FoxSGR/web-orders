import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import {
  AbstractWizardComponent,
  WizardType,
} from '../abstract-wizard/abstract-wizard.component';
import { Entity } from '../../../models/entity';
import { EntityType, OptionalId } from '../../../types';

@Component({
  selector: 'wo-standalone-wizard',
  templateUrl: '../abstract-wizard/abstract-wizard.component.html',
  styleUrls: ['../abstract-wizard/abstract-wizard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandaloneWizardComponent<T extends Entity>
  extends AbstractWizardComponent<T>
  implements OnInit
{
  /**
   * The type of wizard.
   */
  override wizardType: WizardType = 'standalone';

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
  private _id: OptionalId;

  /**
   * Type of entity.
   * @param value
   */
  @Input()
  set entityType(value: EntityType) {
    if (!this.entityConfig) {
      this.setEntityConfig(value);
    }
  }
  /**
   * Whether to show a header.
   */
  @Input()
  override showHeader = true;

  /**
   * Callback to execute when the wizard is completed.
   */
  @Input()
  onCompleteCallback?: (entity: T) => void;

  override ngOnInit() {
    super.ngOnInit();

    // open the first step
    const firstStep = Object.entries(this.wizard.steps)[0];
    this.currentStep = {
      key: firstStep[0],
      step: firstStep[1],
      index: 0,
    };
  }

  /**
   * Runs when the wizard is completed successfully.
   * @param entity
   * @protected
   */
  protected override onComplete(entity: T) {
    super.onComplete(entity);
    this.onCompleteCallback?.(entity);
  }
}
