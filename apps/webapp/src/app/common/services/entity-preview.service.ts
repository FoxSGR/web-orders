import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { get } from 'lodash';
import dayjs from 'dayjs';

import { Id } from '@web-orders/api-interfaces';
import { Entity } from '../models/entity';
import { EntityType } from '../types';
import { EntityPreviewComponent } from '../components/entity-preview/entity-preview.component';
import { EntityPreviewCompareComponent } from '../components/entity-preview/entity-preview-compare/entity-preview-compare.component';
import { EntityPreviewItem } from '../components';

@Injectable({ providedIn: 'root' })
export class EntityPreviewService {
  constructor(
    private store: Store,
    private translate: TranslateService,
    private modalController: ModalController,
  ) {}

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

  itemValue(item: EntityPreviewItem, model: any): any {
    let value: Observable<any>;
    if (typeof item.value === 'function') {
      value = item.value();
      if (!(value instanceof Observable)) {
        value = of(value);
      }
    } else if (!item.valueType || item.valueType === 'prop') {
      if (item.value) {
        value = of(get(model, item.value as string));
      } else {
        value = of(model as any);
      }
    } else {
      value = of(item.value);
    }

    return value.pipe(
      switchMap(v => {
        if (typeof v === 'string' && item.choices?.[v]) {
          return this.translate.get(item.choices[v]?.label);
        } else if (typeof v === 'string' && v.startsWith('str.')) {
          return this.translate.get(v);
        } else {
          return of(v);
        }
      }),
      map(v => {
        if (v instanceof Date) {
          v = dayjs(v).format('DD/MM/YYYY');
        }

        return v;
      }),
    );
  }
}
