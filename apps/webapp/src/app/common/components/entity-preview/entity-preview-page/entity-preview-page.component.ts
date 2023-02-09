import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityConfig, EntityType } from '../../../types';
import { Entity } from '../../../models/entity';
import { EntityConfigRegister } from '../../../entity-config.register';
import { EntityHelperService } from '../../../services';

@Component({
  templateUrl: './entity-preview-page.component.html',
})
export class EntityPreviewPageComponent<T extends Entity> implements OnInit {
  entity: T;
  entityType: EntityType;

  private entityConfig: EntityConfig<T>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private entityHelperService: EntityHelperService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async data => {
      this.entityType = data['entityType'];
      this.entity = await this.entityHelperService.findEntity<T>(
        data['id'],
        this.entityType,
      );
      this.entityConfig = EntityConfigRegister.getDefinition<T>(
        this.entityType,
      );
    });
  }

  label() {
    return this.entityConfig.label(this.entity);
  }
}
