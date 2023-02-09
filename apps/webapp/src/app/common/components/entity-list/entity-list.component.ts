import { Directive, Injector } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';

import { BaseComponent } from '../base.component';
import { Entity } from '../../models/entity';
import { EntityPage } from '../../wo-common.types';
import { EntityListDropdownComponent } from './entity-list-dropdown.component';
import { EntityService } from '../../services';
import { EntityName, entitySelectors } from '../../store';
import { sampleActions } from '../../../sample';

interface EntityListConfig<T extends Entity> {
  entityName: EntityName;
  columns: TableColumn[];
  service: EntityService<T>;
  preview?: {
    component: { new (): any };
  };
}

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class EntityListComponent<
  T extends Entity,
> extends BaseComponent {
  rows: T[] = [];

  status = this.store.select(entitySelectors(this.config.entityName).getStatus);

  ColumnMode = ColumnMode;

  pageSize = 10;

  page: EntityPage<T> = {
    offset: 0,
    size: 0,
    items: [],
    total: 0,
  };

  private readonly popoverController: PopoverController;
  private readonly modalController: ModalController;

  private currentActionsDropdown: HTMLIonPopoverElement | null = null;

  protected constructor(
    private readonly injector: Injector,
    public readonly config: EntityListConfig<T>,
  ) {
    super(injector);
    this.popoverController = injector.get(PopoverController);
    this.modalController = injector.get(ModalController);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setPage(0);
    this.store
      .select(entitySelectors(this.config.entityName).getPage)
      .subscribe(page => {
        if (!page) {
          return;
        }

        this.page = { ...page } as any;
        this.page.offset /= this.pageSize;
      });
  }

  async preview(entity: T) {
    const previewConfig = this.config.preview!;
    const modal = await this.modalController.create({
      component: previewConfig.component,
      componentProps: {
        entity,
      },
      showBackdrop: true,
      presentingElement: await this.modalController.getTop(),
      breakpoints: [0, 0.3, 0.8],
      initialBreakpoint: 0.8,
    });

    modal.present();
  }

  async actionsDropdown(event: Event, entity: T) {
    await this.currentActionsDropdown?.dismiss();

    this.currentActionsDropdown = await this.popoverController.create({
      component: EntityListDropdownComponent,
      event,
      translucent: true,
      dismissOnSelect: true,
      showBackdrop: false,
      componentProps: {
        entity,
        service: this.config.service,
        entityName: this.config.entityName,
      },
    });

    this.currentActionsDropdown.present();
  }

  setPage(page: number): void {
    console.log(page);
    this.store.dispatch(
      sampleActions.loadPage({ params: { offset: page * this.pageSize } }),
    );
  }
}
