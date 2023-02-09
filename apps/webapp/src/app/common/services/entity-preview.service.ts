import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { Id } from '@web-orders/api-interfaces';
import { Entity } from '../models/entity';
import { EntityType } from '../types';
import { EntityPreviewComponent } from '../components/entity-preview/entity-preview.component';
import { EntityPreviewCompareComponent } from '../components/entity-preview/entity-preview-compare/entity-preview-compare.component';

@Injectable({ providedIn: 'root' })
export class EntityPreviewService {
  constructor(private store: Store, private modalController: ModalController) {}

  /**
   * Displays an entity preview as a modal.
   * @param id
   * @param entityType
   * @param nested
   */
  async previewEntity<T extends Entity = Entity>(
    id: Id,
    entityType: EntityType,
    nested?: boolean,
  ) {
    const breakpoints = nested ? [0, 0.2, 0.7] : [0, 0.3, 0.9];

    const modal = await this.modalController.create({
      component: EntityPreviewComponent,
      componentProps: {
        entityId: id,
        entityType,
      },
      showBackdrop: true,
      presentingElement: await this.modalController.getTop(),
      breakpoints,
      initialBreakpoint: breakpoints[breakpoints.length - 1],
      cssClass: 'entity-preview-modal',
    });

    modal.present();
  }

  /**
   * Opens a dialog requesting the user to solve a conflict between two versions
   * of an entity.
   * @param entityType
   * @param left
   * @param leftLabel
   * @param right
   * @param rightLabel
   */
  async resolveConflict<T extends Entity>(
    entityType: EntityType,
    left: T,
    leftLabel: string,
    right: T,
    rightLabel: string,
  ): Promise<T> {
    const modal = await this.modalController.create({
      component: EntityPreviewCompareComponent,
      componentProps: {
        entityType,
        left,
        right,
        leftLabel,
        rightLabel,
        onPick: result => {
          if (result === 'left') {
            modal.dismiss(left);
          } else {
            modal.dismiss(right);
          }
        },
      },
      backdropDismiss: true,
      showBackdrop: true,
      presentingElement: await this.modalController.getTop(),
      cssClass: ['entity-preview-compare-modal', 'entity-preview'],
    });
    await modal.present();

    const result = await modal.onDidDismiss();
    return result.data || left;
  }
}
