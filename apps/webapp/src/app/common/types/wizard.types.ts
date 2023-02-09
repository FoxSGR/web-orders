import { Injector } from '@angular/core';
import { SmartForm, SmartFormState } from './smart-form.types';
import { EntityType } from './entity.types';

export interface EntityFormWizardStep {
  title?: string;
  route: string;
  form: SmartForm;
}

export interface EntityFormWizard {
  messages: {
    save: string;
  };
  header: {
    creating: string;
    updating: string;
    icon: string;
  };
  steps: { [key: string]: EntityFormWizardStep };
  preSave?: {
    callback?: (
      state: SmartFormState,
      injector: Injector,
    ) => Promise<void> | void;
    proceedConfirmationMessage?: string;
  };
  postSave?: {
    callback?: (
      state: SmartFormState,
      injector: Injector,
    ) => Promise<void> | void;
  };
}

export interface EntityFormWizardStepData {
  entityType: EntityType;
  step?: string;
}
