import { SmartForm } from './smart-form.types';
import { EntityType } from './entity.types';
import { EntityService } from '../services';
import { Entity } from '../models/entity';

export interface EntityFormWizardStep {
  title?: string;
  route: string;
  form: SmartForm;
}

export interface EntityFormWizard<T extends Entity = Entity> {
  messages: {
    save: string;
  };
  header: {
    creating: string;
    updating: string;
    icon: string;
  };
  steps: { [key: string]: EntityFormWizardStep };
}

export interface EntityFormWizardStepData {
  entityType: EntityType;
  step?: string;
}
