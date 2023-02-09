import { Component, Input } from '@angular/core';

import { WizardType } from '../abstract-wizard/abstract-wizard.component';
import { AbstractModalComponent } from '../../abstract-modal/abstract-modal.component';
import { EntityFormWizard, EntityType, OptionalId } from '../../../types';
import { EntityConfigRegister } from '../../../entity-config.register';

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <ion-icon
            style="vertical-align: middle; margin-bottom: 5px"
            [name]="wizard.header.icon"
          ></ion-icon>
          <span *ngIf="id !== '_'">
            {{ wizard.header.updating | translate }}
            {{ id }}
          </span>
          <span *ngIf="id === '_'">
            {{ wizard.header.creating | translate }}
          </span>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <wo-standalone-wizard
        [entityType]="entityType"
        [id]="id"
        [showHeader]="false"
        [onCompleteCallback]="_onCompleteCallback"
      >
      </wo-standalone-wizard>
    </ion-content>
  `,
})
export class StandaloneWizardModalComponent extends AbstractModalComponent {
  /**
   * The type of wizard.
   */
  @Input()
  wizardType: WizardType = 'standalone';

  /**
   * Id of the entity.
   */
  @Input()
  id: OptionalId;

  /**
   * Type of entity.
   */
  @Input()
  entityType: EntityType;

  /**
   * Callback to execute when the wizard is completed.
   */
  @Input()
  set onCompleteCallback(value: (...args) => void) {
    this._onCompleteCallback = (...args) => {
      value(...args);
      this.modal.dismiss();
    };
  }
  _onCompleteCallback: (...args) => void;

  get wizard(): EntityFormWizard {
    return EntityConfigRegister.getDefinition(this.entityType).wizardConfig!;
  }
}
