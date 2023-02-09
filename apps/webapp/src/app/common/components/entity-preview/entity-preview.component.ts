import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import { Id } from '@web-orders/api-interfaces';
import type { Entity } from '../../models/entity';
import { EntityType } from '../../types';
import { EntityPreviewConfig } from './entity-preview.types';
import { EntityConfigRegister } from '../../entity-config.register';
import { AbstractModalComponent } from '../abstract-modal/abstract-modal.component';
import {
  EntityHelperService,
  EntityPrintService,
  EntityWizardService,
} from '../../services';

@Component({
  selector: 'wo-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityPreviewComponent<T extends Entity>
  extends AbstractModalComponent
  implements OnInit
{
  @Input() entity: T;
  @Input() entityId?: Id;
  @Input() entityType: EntityType;

  previewData!: EntityPreviewConfig;

  constructor(
    protected translate: TranslateService,
    protected store: Store,
    private cdr: ChangeDetectorRef,
    private entityHelperService: EntityHelperService,
    private entityPrintService: EntityPrintService,
    private wizardService: EntityWizardService,
  ) {
    super();
  }

  override async ngOnInit() {
    super.ngOnInit();

    if (this.entityId && !this.entity) {
      this.entity = await this.entityHelperService.findEntity<T>(
        this.entityId,
        this.entityType,
      );
    }

    const entityConfig = EntityConfigRegister.getDefinition<T>(this.entityType);
    this.previewData = entityConfig.previewConfig!(this.entity, false);
    this.cdr.detectChanges();
  }

  /**
   * Opens the edit page.
   */
  edit() {
    this.wizardService.openWizard(this.entityType, 'routed', this.entity.id);
    this.close();
  }

  /**
   * Prints the entity.
   */
  async print() {
    await this.entityPrintService.printEntity(this.entity, this.entityType);
  }
}
