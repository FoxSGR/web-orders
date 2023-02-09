import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import {
  AbstractWizardComponent,
  WizardType,
} from '../abstract-wizard/abstract-wizard.component';
import { Entity } from '../../../models/entity';
import {
  EntityFormWizardStep,
  EntityFormWizardStepData,
  OptionalId,
} from '../../../types';
import { padWithSlashes } from '../../../util';
import { EntityConfigRegister } from '../../../entity-config.register';
import { HistoryService } from '../../../services';

@Component({
  templateUrl: '../abstract-wizard/abstract-wizard.component.html',
  styleUrls: ['../abstract-wizard/abstract-wizard.component.scss'],
})
export class RoutedWizardComponent<T extends Entity>
  extends AbstractWizardComponent<T>
  implements OnInit
{
  /**
   * Id of the entity.
   */
  override id: OptionalId;

  /**
   * The type of wizard.
   */
  override wizardType: WizardType = 'routed';

  /**
   * The current route url.
   */
  private routeUrl: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private historyService: HistoryService,
    injector: Injector,
  ) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();

    this.findCurrentStepByRoute();
    this.router.events
      .pipe(
        takeUntil(this.ngDestroyed$),
        filter(event => event instanceof NavigationStart),
        map(event => (event as NavigationStart).url),
      )
      .subscribe(routeUrl => {
        this.routeUrl = routeUrl;
        this.findCurrentStepByRoute();
      });
  }

  /**
   * Navigates to a step.
   * @param step
   * @param key
   */
  override navigate(step: EntityFormWizardStep, key: string) {
    super.navigate(step, key);
    this.router.navigate([step.route!], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Loads data from the route.
   * @private
   */
  override async loadWizard(): Promise<void> {
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

    this.findCurrentStepByRoute();

    await super.loadWizard();
  }

  /**
   * Runs when the wizard is completed successfully.
   * @param entity
   * @protected
   */
  protected override onComplete(entity: T) {
    super.onComplete(entity);

    // navigate to the last route before coming to the wizard
    // or the entity home
    const route =
      this.historyService.lastRouteBefore(
        new RegExp(`\\/${this.entityConfig.route}\\/wizard\\/(_|\\d+)\\/`),
      ) || `/${this.entityConfig.route}`;
    this.router.navigate([route]);
  }

  /**
   * Finds the current step by the current route.
   * @private
   */
  private findCurrentStepByRoute() {
    if (!this.wizard) {
      return;
    }

    if (!this.routeUrl) {
      this.routeUrl = this.router.url;
    }

    this.routeUrl = padWithSlashes(this.routeUrl);

    for (const [key, step] of Object.entries(this.wizard.steps)) {
      const stepRoute = padWithSlashes(step.route!);
      if (this.routeUrl.includes(stepRoute)) {
        this.currentStep = {
          key,
          step,
        };
        break;
      }
    }
  }
}
