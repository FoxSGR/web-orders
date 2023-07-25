import { Directive, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { firstValueFrom, take } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

import { customEmpty, customEquals } from '../../../util';
import { BaseComponent } from '../../base.component';
import {
  EntityConfig,
  EntityFormWizard,
  EntityFormWizardStep,
  EntityType,
  OptionalId,
  SmartFormState,
} from '../../../types';
import { entityActions, entitySelectors } from '../../../store';
import { SmartFormInGenerator, SmartFormOutGenerator } from '../../smart-form';
import { Entity } from '../../../models/entity';
import {
  AlertService,
  DialogService,
  EntityPreviewService,
  EntityService,
} from '../../../services';
import { SmartFormValidator } from '../../smart-form/smart-form.validator';
import { EntityConfigRegister } from '../../../entity-config.register';

export type WizardType = 'standalone' | 'routed';

@Directive()
export abstract class AbstractWizardComponent<T extends Entity>
  extends BaseComponent
  implements OnInit
{
  /**
   * The type of wizard.
   */
  abstract wizardType: WizardType;

  /**
   * Structure definition of the wizard.
   */
  get wizard(): EntityFormWizard {
    return this.entityConfig?.wizardConfig as EntityFormWizard;
  }

  /**
   * Id of the entity.
   */
  abstract id: OptionalId;

  /**
   * The steps of the wizard.
   */
  steps: EntityFormWizardStep[];

  /**
   * Configuration of the entity type.
   */
  entityConfig: EntityConfig<T>;

  /**
   * Whether to show a header.
   */
  showHeader = true;

  /**
   * The current step.
   */
  currentStep: { step: EntityFormWizardStep; key: string; index: number };

  /**
   * Whether the wizard is loading.
   */
  loading = true;

  get entitySelectors() {
    return entitySelectors(this.entityConfig.entityType);
  }
  get entityActions() {
    return entityActions(this.entityConfig.entityType);
  }

  private loadingCtrl = this.injector.get(LoadingController);
  private alertCtrl = this.injector.get(AlertController);
  private previewService = this.injector.get(EntityPreviewService);
  private dialogService = this.injector.get(DialogService);
  private alertService = this.injector.get(AlertService);

  override ngOnInit() {
    super.ngOnInit();
    this.loadWizard();
  }

  /**
   * Whether a step is the current selected step.
   * @param step
   */
  isCurrentStep(step: EntityFormWizardStep): boolean {
    return step === this.currentStep.step;
  }

  /**
   * Navigates to a step.
   * @param key
   */
  navigate(key: string) {
    const step = this.wizard.steps[key];
    const index = Object.keys(this.wizard.steps).indexOf(key);
    this.currentStep = {
      step,
      key,
      index,
    };
  }

  /**
   * Navigates to the next step.
   */
  nextStep() {
    const currentIndex = this.currentStep.index;
    if (currentIndex === this.steps.length - 1) {
      this.complete();
      return;
    }

    const key = Object.keys(this.wizard.steps)[currentIndex + 1];
    this.navigate(key);
  }

  /**
   * Navigates to the previous step.
   */
  previousStep() {
    const key = Object.keys(this.wizard.steps)[this.currentStep.index - 1];
    this.navigate(key);
  }

  /**
   * Finds the appropriate color for the button of a step.
   * @param stepIndex
   * @param step
   */
  buttonColor(stepIndex: number, step: EntityFormWizardStep) {
    if (this.isCurrentStep(step)) {
      return 'primary';
    }

    if (this.currentStep.index < stepIndex) {
      return 'medium';
    } else {
      return 'primary';
    }
  }

  /**
   * Whether a new entity is being created.
   */
  creating(): boolean {
    return this.id === '_';
  }

  /**
   * Loads the wizard.
   * @private
   */
  async loadWizard() {
    await this.loadEntity();

    // wait until the entity state is loaded
    this.store
      .select(this.entitySelectors.getWizard(this.id))
      .pipe(
        takeUntil(this.ngDestroyed$),
        filter(state => !!state),
        take(1),
      )
      .subscribe(() => {
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  /**
   * Completes the wizard by saving the entity.
   * @private
   */
  async complete() {
    const loading = await this.loadingCtrl.create({
      duration: 120000,
    });
    loading.present();

    const state = await firstValueFrom(
      this.store
        .select(
          entitySelectors(this.entityConfig.entityType).getWizard(this.id),
        )
        .pipe(take(1)),
    );

    try {
      let entity = await this.generateEntity(state);
      if (!entity) {
        loading.dismiss();
        return;
      }

      await this.preSave(state);

      // save the entity
      const service = this.injector.get(this.entityConfig.serviceClass);
      if (this.id === '_') {
        entity = await firstValueFrom(service.create(entity));
      } else {
        entity['id'] = this.id;
        entity = await firstValueFrom(service.update(entity));
      }

      await this.postSave(state);

      this.onComplete(entity as T);
    } catch (e: any) {
      console.error(e);

      let message = 'str.wizard.alerts.saveError.message';
      if (e.status === 400) {
        message = 'str.wizard.alerts.saveInvalid.message';
      }
      this.alertService.showAlert({
        type: 'error',
        message,
      });
    } finally {
      loading.dismiss();
    }
  }

  /**
   * Clears the wizard.
   */
  clear() {
    this.dialogService.confirm(() => {
      this.store.dispatch(
        this.entityActions.updateWizard({
          id: this.id,
          wizardState: { values: {} },
        }),
      );

      // :) TODO: improve this
      setTimeout(() => window.location.reload(), 2000);
    });
  }

  /**
   * Runs when the wizard is completed successfully.
   * @param entity
   * @protected
   */
  protected onComplete(entity: T) {
    // show a success alert
    this.alertService.showAlert({
      type: 'success',
      message: this.wizard.messages.save,
      buttons: [
        {
          text: this.translate.instant('str.common.see'),
          callback: () => {
            this.previewService.previewEntity(
              entity.id!,
              this.entityConfig.entityType,
            );
          },
        },
      ],
    });

    // clear the wizard
    this.store.dispatch(
      this.entityActions.clearWizard({
        id: this.id,
      }),
    );
  }

  /**
   * Loads the entity.
   * @protected
   */
  protected async loadEntity() {
    const state = await firstValueFrom(
      this.store.select(this.entitySelectors.getWizard(this.id)).pipe(take(1)),
    );

    // if creating a new entity, check if the new entity state already exists
    // if not, create it
    if (this.id === '_') {
      if (!state) {
        this.store.dispatch(
          this.entityActions.updateWizard({
            id: this.id,
            wizardState: { values: {} },
          }),
        );
      }

      return;
    }

    try {
      const service = this.injector.get<EntityService<T>>(
        this.entityConfig.serviceClass,
      );
      let entity = await firstValueFrom(service.findById(this.id));

      if (state) {
        entity = await this.confirmLocalOrRemote(state, entity);
      }

      const generator = new SmartFormInGenerator(
        this.injector,
        entity,
        ...Object.values(this.wizard.steps).map(step => step.form),
      );

      this.store.dispatch(
        entityActions(this.entityConfig.entityType).updateWizard({
          id: this.id,
          wizardState: await generator.generate(),
        }),
      );
    } catch (e) {
      console.error(e);
      this.alertService.showAlert({
        type: 'error',
        message: 'str.wizard.alerts.load.message',
      });
    }
  }

  /**
   * Sets the entity config.
   * @param entityType
   * @protected
   */
  protected setEntityConfig(entityType: EntityType) {
    this.entityConfig = EntityConfigRegister.getDefinition(entityType);
    this.steps = Object.values(this.entityConfig.wizardConfig?.steps || {});
  }

  private async postSave(state: SmartFormState) {
    if (!this.wizard.postSave?.callback) {
      return;
    }

    try {
      await this.wizard.postSave.callback(state, this.injector);
    } catch (e) {
      // ignore because the show must go on
      console.error(e);
    }
  }

  private async preSave(state: SmartFormState) {
    if (!this.wizard.preSave?.callback) {
      return;
    }

    try {
      await this.wizard.preSave.callback(state, this.injector);
    } catch (e) {
      console.error(e);

      if (this.wizard.preSave.proceedConfirmationMessage) {
        const proceed = await this.dialogService.confirm(
          undefined,
          this.wizard.preSave.proceedConfirmationMessage,
        );

        if (!proceed) {
          throw e;
        }
      }
    }
  }

  /**
   * Resolves a conflict between local changes and the fetched remote entity.
   * @param localState
   * @param remote
   * @private
   */
  private async confirmLocalOrRemote(
    localState: SmartFormState,
    remote: T,
  ): Promise<T> {
    if (this.wizardType !== 'routed') {
      return remote;
    }

    let localEntity: T | undefined = undefined;
    try {
      const generator = new SmartFormOutGenerator<T>(
        cloneDeep(localState),
        false,
        ...Object.values(this.wizard.steps).map(step => step.form),
      );
      localEntity = generator.generate() as T;
      localEntity = this.entityConfig.service!.parseEntity(localEntity);

      if (
        customEquals(localEntity, remote, {
          ignoredKeys: ['id', 'createdAt', 'updatedAt', 'deletedAt'],
        })
      ) {
        return remote;
      }
    } catch (e) {
      // just log the error
      console.error(e);
      return remote;
    }

    // show an alert explaining the conflict
    const alert = await this.alertCtrl.create({
      message: await this.translate.instant(
        'str.entity.preview.alerts.conflict.message',
      ),
      buttons: [
        {
          text: 'OK',
          handler: () => alert.dismiss(),
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();

    // ask the user to choose between the local and the remote version
    return await this.previewService.resolveConflict<T>(
      this.entityConfig.entityType,
      localEntity,
      'str.common.localChanges',
      remote,
      'str.common.loadedFromServer',
    );
  }

  /**
   * Generates the entity from the wizard forms.
   * @param state
   * @private
   */
  private async generateEntity(
    state: SmartFormState,
  ): Promise<Partial<T> | undefined> {
    const definitions = Object.values(this.wizard.steps).map(step => step.form);

    // validate the entity
    const validator = new SmartFormValidator(
      this.translate,
      state,
      ...definitions,
    );
    const results = validator.validate();
    if (results.length > 0) {
      this.alertService.showAlert({
        type: 'error',
        message: results[0].message,
      });
      return;
    }

    // generate a model from the state
    const generator = new SmartFormOutGenerator<T>(state, true, ...definitions);
    const entity = generator.generate()!;

    if (customEmpty(entity)) {
      this.alertService.showAlert({
        type: 'warning',
        message: 'str.wizard.alerts.empty.message',
      });
      return;
    }

    return entity;
  }
}
