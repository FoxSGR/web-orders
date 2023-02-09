import { Directive, OnInit } from '@angular/core';
import { debounceTime, firstValueFrom, Subject, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

import {
  EntityConfig,
  EntityFormWizard,
  OptionalId,
  SmartFormState,
} from '../../../types';
import { entityActions, entitySelectors } from '../../../store';
import { Entity } from '../../../models/entity';
import { BaseComponent } from '../../base.component';

@Directive()
export abstract class AbstractStepComponent<T extends Entity>
  extends BaseComponent
  implements OnInit
{
  /**
   * Structure definition of the entity wizard.
   */
  get wizardDefinition(): EntityFormWizard<T> | undefined {
    return this.entityConfig?.wizardConfig;
  }

  /**
   * Key of the step.
   */
  stepKey: string;

  /**
   * Config of the entity type.
   */
  entityConfig: EntityConfig<T>;

  /**
   * State of the wizard.
   */
  state: SmartFormState;

  /**
   * Subject to manage changes and update the store.
   */
  changes = new Subject<SmartFormState>();

  /**
   * The id of the entity.
   */
  set id(value: OptionalId) {
    this._id = value || '_';
  }
  get id(): OptionalId {
    return this._id;
  }
  protected _id: OptionalId;

  /**
   * Flag to manage store updates and prevent repeated state updates.
   * @private
   */
  private stateUpdated = false;

  override async ngOnInit() {
    super.ngOnInit();
    await this.loadStep();

    this.changes
      .pipe(takeUntil(this.ngDestroyed$), debounceTime(250))
      .subscribe(() => {
        this.stateUpdated = true;
        this.store.dispatch(
          entityActions(this.entityConfig.entityType).updateWizard({
            id: this.id,
            wizardState: this.state,
          }),
        );
      });

    // this.store
    //   .select(entitySelectors(this.entityConfig.entityType).getWizard(this.id))
    //   .pipe(takeUntil(this.ngDestroyed$))
    //   .subscribe(state => {
    //     if (this.stateUpdated) {
    //       this.stateUpdated = false;
    //       return;
    //     }
    //
    //     console.log(cloneDeep(state))
    //
    //     this.state = state;
    //     this.cdr.detectChanges();
    //   });
  }

  /**
   * Loads data from the route.
   * @private
   */
  protected async loadStep() {
    let state = await firstValueFrom(
      this.store
        .select(
          entitySelectors(this.entityConfig.entityType).getWizard(this.id),
        )
        .pipe(take(1)),
    );

    if (!state) {
      state = {
        values: {},
      };
    }

    this.state = state;
  }
}
