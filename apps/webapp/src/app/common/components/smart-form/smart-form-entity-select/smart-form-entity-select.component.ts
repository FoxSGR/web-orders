import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IonAccordionGroup, IonModal } from '@ionic/angular';

import { EntityConfig, SmartFormEntitySelect } from '../../../types';
import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';
import { Entity } from '../../../models/entity';
import { adjustModalHeight, isInView } from '../../../util';
import { EntityListConfig } from '../../entity-list/entity-list.types';
import { EntityConfigRegister } from '../../../entity-config.register';

@Component({
  selector: 'wo-smart-form-entity-select',
  templateUrl: './smart-form-entity-select.component.html',
  styleUrls: ['./smart-form-entity-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFormEntitySelectComponent
  extends SmartFormAbstractItemComponent<
    Entity[],
    SmartFormEntitySelect<Entity[]>
  >
  implements OnInit, AfterViewChecked
{
  @ViewChild('modal', { read: IonModal }) modal: IonModal;

  /**
   * The type of input.
   */
  get mode() {
    return this.definition.mode || 'accordion';
  }

  /**
   * Entity config.
   */
  entityConfig!: EntityConfig<Entity>;

  /**
   * Config for the entity list.
   */
  listConfig!: EntityListConfig<Entity>;

  /**
   * The default value.
   */
  protected override defaultValue = [];

  override ngOnInit() {
    super.ngOnInit();

    this.entityConfig = EntityConfigRegister.getDefinition(
      this.definition.entityName,
    );
    this.listConfig = {
      ...this.entityConfig.listConfig,
      ...this.definition.config,
    };
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustModalHeight();
  }

  /**
   * Handles an item selection.
   * @param selected
   * @param accordion
   */
  onEntitySelect(selected: Entity[], accordion?: IonAccordionGroup) {
    // close the accordion or modal if the selection type is single
    if (this.listConfig.selection === 'single' && selected.length > 0) {
      if (accordion) {
        accordion.value = undefined;
      } else if (this.modal) {
        this.modal.dismiss();
      }
    }

    this.onChange();
  }

  /**
   * Removes a selected entity.
   * @param entity
   * @param event
   */
  removeItem(entity: Entity, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.value = this.value!.filter(e => e.id !== entity.id);
    this.onChange();
  }

  /**
   * Handles an accordion toggle.
   * @param event
   */
  onAccordionToggle(event: Event) {
    // if the whole element is not visible, scroll to it
    if ((event as CustomEvent).detail?.value) {
      const target = event.target! as HTMLElement;
      setTimeout(() => {
        if (!isInView(target)) {
          target.offsetParent?.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth',
          });
        }
      }, 150);
    }

    this.cdr.detectChanges();
  }

  /**
   * Handles a modal open.
   */
  onModalPresent() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => this.adjustModalHeight(), (i + 1) * 300);
    }
  }

  /**
   * Adjusts the height of the modal.
   * @returns
   */
  private adjustModalHeight() {
    if (this.mode !== 'modal') {
      return;
    }

    adjustModalHeight(this.modal['el'] as any);
  }
}
