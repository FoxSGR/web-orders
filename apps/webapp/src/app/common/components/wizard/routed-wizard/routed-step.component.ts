import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';

import { EntityFormWizardStepData } from '../../../types';
import { Entity } from '../../../models/entity';
import { EntityConfigRegister } from '../../../entity-config.register';
import { AbstractStepComponent } from '../abstract-wizard/abstract-step.component';

@Component({
  selector: 'wo-step',
  templateUrl: '../abstract-wizard/abstract-step.component.html',
  styleUrls: ['../abstract-wizard/abstract-step.component.scss'],
})
export class RoutedStepComponent<
  T extends Entity,
> extends AbstractStepComponent<T> {
  constructor(injector: Injector, private activatedRoute: ActivatedRoute) {
    super(injector);
  }

  /**
   * Loads data from the route.
   * @private
   */
  protected override async loadStep() {
    const routeData = (await firstValueFrom(
      this.activatedRoute.data,
    )) as EntityFormWizardStepData;
    const routeParams = await firstValueFrom(
      this.activatedRoute.params.pipe(take(1)),
    );

    this.id = routeParams['id'];
    this.entityConfig = EntityConfigRegister.getDefinition(
      routeData.entityType,
    );

    this.stepKey = routeData.step!;

    await super.loadStep();
  }
}
