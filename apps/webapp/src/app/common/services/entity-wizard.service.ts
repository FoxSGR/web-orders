import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { EntityType, OptionalId } from '../types';
import { WizardType } from '../components/wizard/abstract-wizard/abstract-wizard.component';
import { EntityConfigRegister } from '../entity-config.register';
import { Entity } from '../models/entity';
import { StandaloneWizardModalComponent } from '../components/wizard/standalone-wizard/standalone-wizard-modal.component';

@Injectable({ providedIn: 'root' })
export class EntityWizardService {
  constructor(
    private router: Router,
    private modalController: ModalController,
  ) {}

  /**
   * Opens an entity wizard.
   * @param entityType
   * @param wizardType
   * @param id
   * @param config
   */
  async openWizard<T extends Entity = Entity>(
    entityType: EntityType,
    wizardType: WizardType,
    id?: OptionalId,
    config: { nested?: boolean; onComplete?: (entity: T) => void } = {},
  ) {
    id = id || '_';

    const entityConfig = EntityConfigRegister.getDefinition(entityType);
    if (!entityConfig.wizardConfig) {
      throw new Error(`Wizard of entity type '${entityType}' not implemented`);
    }

    if (wizardType === 'routed') {
      this.router.navigate([`${entityConfig.route}/wizard/${id}`]);
      return;
    }

    const breakpoints = config.nested ? [0, 0.3, 0.7] : [0, 0.2, 0.9];
    const modal = await this.modalController.create({
      component: StandaloneWizardModalComponent,
      componentProps: {
        id,
        entityType,
        onCompleteCallback: config.onComplete,
      },
      showBackdrop: true,
      presentingElement: await this.modalController.getTop(),
      breakpoints,
      initialBreakpoint: breakpoints[breakpoints.length - 1],
    });
    modal.present();
  }
}
