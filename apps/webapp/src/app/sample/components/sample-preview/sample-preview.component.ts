import { Component, OnInit } from '@angular/core';

import {
  EntityPreviewComponent,
  EntityPreviewItem,
  ShoeSample,
} from '../../../common';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentType } from '@web-orders/api-interfaces';
import { shoeComponentConstants } from '../../../shoe-component';

@Component({
  templateUrl: './sample-preview.component.html',
  styleUrls: [
    '../../../common/components/entity-preview/entity-preview.component.scss',
    './sample-preview.component.scss',
  ],
})
export class SamplePreviewComponent
  extends EntityPreviewComponent<ShoeSample>
  implements OnInit
{
  componentGroups: { type: ComponentType; components: EntityPreviewItem[] }[];

  overviewItems: EntityPreviewItem[] = [
    {
      icon: 'construct',
      label: 'str.model.common.model',
      value: 'sampleModel.reference',
    },
    {
      icon: 'people',
      label: 'str.client.common.client',
      value: 'client.name',
    },
    {
      icon: 'bag',
      label: 'str.brand.common.brand',
      value: 'brand.name',
    },
    {
      icon: () => {
        if (this.entity.sampleModel?.season?.seasons === 'fall_winter') {
          return 'rainy';
        } else {
          return 'sunny';
        }
      },
      label: 'str.sample.common.season',
      value: () => {
        let tr: string;
        const key = this.entity.sampleModel.season?.seasons;
        if (key === 'fall_winter') {
          tr = 'str.sample.season.fallWinter';
        } else if (key === 'spring_summer') {
          tr = 'str.sample.season.springSummer';
        } else {
          return of(`${this.entity.sampleModel.season?.year}` || '');
        }

        return this.translate
          .get(tr)
          .pipe(map(v => `${v} ${this.entity.sampleModel.season?.year || ''}`));
      },
    },
  ];

  detailItems: EntityPreviewItem[] = [
    {
      icon: 'hand-left',
      label: 'str.agent.common.agent',
      value: 'agent.name',
    },
    {
      icon: 'calendar',
      label: 'str.sample.common.dateAsked',
      value: 'dateAsked',
    },
    {
      icon: 'reader',
      label: 'str.common.notes',
      value: 'notes',
      type: 'text',
    },
  ];

  override ngOnInit() {
    super.ngOnInit();
    this.componentGroups = this.entity.sampleModel
      .groupComponents()
      .map(group => ({
        type: group.type,
        components: group.components.map(v => ({
          icon: shoeComponentConstants.types[v.component.type].icon,
          value: {
            'str.shoeComponent.types.ornament.type':
              v.component.type === 'ornament'
                ? `str.shoeComponent.types.ornament.types.${v.component.ornamentType}.label`
                : undefined,
            'str.shoeComponent.common.reference': v.component.reference,
            'str.shoeComponent.common.name': v.component.name,
            'str.color.common.color': v.color?.name,
          },
          label: shoeComponentConstants.types[v.component.type].label,
        })),
      }));
  }

  override edit() {
    super.edit();
  }
}
