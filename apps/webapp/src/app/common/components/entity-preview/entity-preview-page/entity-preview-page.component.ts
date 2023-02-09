import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Id } from '@web-orders/api-interfaces';
import { EntityType } from '../../../types';
import { Entity } from '../../../models/entity';

@Component({
  templateUrl: './entity-preview-page.component.html',
})
export class EntityPreviewPageComponent<T extends Entity> implements OnInit {
  entityId: Id;
  entityType: EntityType;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.entityId = data['id'];
      this.entityType = data['entityType'];
    });
  }
}
