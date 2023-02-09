import {
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import {
  LoadingController,
  ModalController,
  PopoverController,
  SelectChangeEventDetail,
} from '@ionic/angular';
import { ColumnMode, SortType, TableColumn } from '@swimlane/ngx-datatable';

import { IFindFilter } from '@web-orders/api-interfaces';
import { BaseComponent } from '../base.component';
import { Entity } from '../../models/entity';
import { EntityPage } from '../../wo-common.types';
import { EntityListDropdownComponent } from './entity-list-dropdown.component';
import { EntityService } from '../../services';
import {
  entityActions,
  EntityName,
  entitySelectors,
  EntityStatus,
} from '../../store';
import { BasicCellComponent } from './cells';
import { ENTITY_LIST_TOKEN, EntityListCellData } from './entity-list.token';
import { Observable } from 'rxjs';

export interface EntityListConfig<T extends Entity> {
  searchables: EntityListSearchable[];
  entityName: EntityName;
  columns: (TableColumn & { template?: any })[];
  service: EntityService<T>;
  preview?: {
    component: { new (t: any): any };
  };
}

interface EntityListSearchable {
  label: string;
  prop: string;
}

interface EntityListSearchbar extends EntityListSearchable {
  value?: string;
}

@Component({
  selector: 'wo-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent<T extends Entity>
  extends BaseComponent
  implements OnInit
{
  @ViewChildren('templates') templates!: QueryList<TemplateRef<any>>;

  @Input() showSearch = false;
  @Input() config!: EntityListConfig<T>;

  status$: Observable<EntityStatus>;

  ColumnMode = ColumnMode;
  SortType = SortType;

  pageSize = 10;

  page: EntityPage<T> = {
    offset: 0,
    size: 0,
    items: [],
    total: 0,
  };

  sort = {
    prop: 'id',
    direction: 'desc',
  };

  searchbars: EntityListSearchbar[];

  private currentActionsDropdown: HTMLIonPopoverElement | null = null;

  private entityActions = entityActions('sample'); // call this just to get the type (overriden below)

  private injectorCache = {};

  constructor(
    injector: Injector,
    private readonly popoverController: PopoverController,
    private readonly modalController: ModalController,
    private readonly loadingController: LoadingController,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.status$ = this.store.select(
      entitySelectors(this.config.entityName).getStatus,
    );
    this.searchbars = [
      {
        ...this.config.searchables[0],
        value: undefined,
      },
    ];
    this.entityActions = entityActions(this.config.entityName);

    this.load({ page: 0 });
    this.store
      .select(entitySelectors(this.config.entityName).getPage)
      .subscribe(page => {
        if (!page) {
          return;
        }

        this.page = { ...page } as any;
        this.page.offset /= this.pageSize;
      });

    this.config.columns.forEach(col => {
      if (!col.template) {
        col.template = BasicCellComponent;
      }
    });
  }

  ngAfterViewInit() {
    for (let i = 0; i < this.templates.length; i++) {
      this.config.columns[i].cellTemplate = this.templates.get(i);
    }
  }

  load({ page }: { page?: number } = {}): void {
    page = page === undefined ? this.page.offset : page;

    const filter: IFindFilter[] = this.searchbars
      .filter(s => s.value?.trim())
      .map(s => ({
        prop: s.prop,
        type: 'contains',
        value: s.value,
      }));

    this.store.dispatch(
      this.entityActions.loadPage({
        params: {
          offset: page * this.pageSize,
          filter,
          sortField: this.sort.prop,
          sortDirection: this.sort.direction as any,
        },
      }),
    );
  }

  async preview(entity: T) {
    const loading = await this.loadingController.create();
    await loading.present();

    this.config.service.findById(entity.id).subscribe(async entity => {
      await loading.dismiss();

      const previewConfig = this.config.preview!;
      const modal = await this.modalController.create({
        component: previewConfig.component,
        componentProps: {
          entity,
        },
        showBackdrop: true,
        presentingElement: await this.modalController.getTop(),
        breakpoints: [0, 0.3, 0.9],
        initialBreakpoint: 0.9,
        cssClass: 'entity-preview-modal',
      });

      modal.present();
    });
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

    await this.currentActionsDropdown.present();
  }

  templateInjector(column: TableColumn, entity: T) {
    const idx = `${column.name}-${entity.id}`;
    if (this.injectorCache[idx]) {
      return this.injectorCache[idx];
    }

    const data: EntityListCellData<T> = {
      entity,
      column,
    };

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: ENTITY_LIST_TOKEN,
          useValue: data,
        },
      ],
    });
    this.injectorCache[idx] = injector;
    return injector;
  }

  search() {
    this.load();
  }

  changeSort({ sorts }) {
    this.sort = { prop: sorts[0].prop, direction: sorts[0].dir };
    this.load();
  }

  availableSearchables(searchbar: EntityListSearchbar): EntityListSearchable[] {
    return [
      searchbar,
      ...this.config.searchables.filter(
        searchbar => !this.searchbars.find(s => s.prop === searchbar.prop),
      ),
    ];
  }

  changeSearchbar(
    searchbar: EntityListSearchbar,
    dumbassEvent: any, // typescript is dumb and won't work with the proper type here
  ) {
    const event: CustomEvent<SelectChangeEventDetail<EntityListSearchbar>> =
      dumbassEvent;
    const newSearchable = event.detail.value;

    // special case to remove
    if (newSearchable.prop === '#remove') {
      this.searchbars = this.searchbars.filter(s => s.prop !== searchbar.prop);
      if (searchbar.value?.trim()) {
        this.load();
      }
      return;
    }

    searchbar.prop = newSearchable.prop;
    searchbar.label = newSearchable.label;

    if (searchbar.value?.trim()) {
      this.load();
    }
  }

  newSearchBar() {
    const searchable = this.config.searchables.find(
      searchable => !this.searchbars.find(s => s.prop === searchable.prop),
    );
    if (searchable) {
      this.searchbars.push({
        ...searchable,
        value: '',
      });
    }
  }

  remainingSearchables(): EntityListSearchable[] {
    return this.config.searchables.filter(
      searchable => !this.searchbars.find(s => s.prop === searchable.prop),
    );
  }
}
