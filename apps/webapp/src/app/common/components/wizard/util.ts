import { Routes } from '@angular/router';

import { EntityFormWizardStepData, EntityType } from '../../types';
import { EntityConfigRegister } from '../../entity-config.register';
import { RoutedStepComponent } from './routed-wizard/routed-step.component';
import { RoutedWizardComponent } from './routed-wizard/routed-wizard.component';

export const createEntityWizardRoutes: (entityType: EntityType) => Routes = (
  entityType: EntityType,
) => {
  const entityConfig = EntityConfigRegister.getDefinition(entityType);

  const routes: Routes = Object.entries(entityConfig.wizardConfig!.steps).map(
    ([key, step]) => ({
      path: step.route!,
      component: RoutedStepComponent,
      data: {
        entityType,
        step: key,
      } as EntityFormWizardStepData,
    }),
  );

  return [
    {
      path: ':id',
      component: RoutedWizardComponent,
      data: { entityType } as EntityFormWizardStepData,
      children: [
        ...routes,
        {
          path: '',
          redirectTo: 'base',
          pathMatch: 'full',
        },
      ],
    },
  ];
};
