import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { padWithSlashes } from '../../util';

export interface StepperStep {
  name: string;
  route: string;
}

export interface StepperOptions {
  steps: StepperStep[];
}

@Component({
  selector: 'wo-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  @Input() options: StepperOptions;

  route$ = this.router.events.pipe(
    filter(event => event instanceof NavigationStart),
    map(event => (event as NavigationStart).url),
  );

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  isCurrentRoute(step: StepperStep, currentRoute: string | null): boolean {
    if (!currentRoute) {
      currentRoute = this.router.url;
    }

    currentRoute = padWithSlashes(currentRoute);
    const stepRoute = padWithSlashes(step.route);

    return currentRoute.includes(stepRoute);
  }

  navigate(step: StepperStep) {
    this.router.navigate([step.route], {
      relativeTo: this.activatedRoute,
    });
  }

  buttonColor(
    stepIndex: number,
    step: StepperStep,
    currentRoute: string | null,
  ) {
    if (this.isCurrentRoute(step, currentRoute)) {
      return 'primary';
    }

    const activeStep = this.currentStepIndex(currentRoute);
    if (activeStep < stepIndex) {
      return 'medium';
    } else {
      return 'primary';
    }
  }

  currentStepIndex(currentRoute: string | null): number {
    for (let i = 0; i < this.options.steps.length; i++) {
      const stepI = this.options.steps[i];
      if (this.isCurrentRoute(stepI, currentRoute)) {
        return i;
      }
    }

    return -1;
  }
}
