import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  LoadingController,
  ModalController,
  PopoverController,
  SelectChangeEventDetail,
} from '@ionic/angular';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
  SortType,
  TableColumn,
} from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';

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

export interface EntityListColumn extends TableColumn {
  template?: any;
}

export interface EntityListConfig<T extends Entity> {
  hideSearch?: boolean;
  searchables: EntityListSearchable[];
  entityName: EntityName;
  columns: EntityListColumn[];
  serviceClass?: { new (...t: any): EntityService<T> };
  service?: EntityService<T>;
  label: (entity: T) => string;
  selection?: 'single' | 'multiple';
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

type EntityMap<T> = { [key: number]: T };

@Component({
  selector: 'wo-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent<T extends Entity>
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  @ViewChildren('templates') templates!: QueryList<TemplateRef<any>>;
  @ViewChild('datatable') datatable: DatatableComponent;

  @Input() config!: EntityListConfig<T>;

  selected: EntityMap<T> = {};

  @Output()
  pick = new EventEmitter<EntityMap<T>>();

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

  private entityActions = entityActions('sample'); // call this just to get the type (overridden below)

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

    if (!this.config.service && this.config.serviceClass) {
      this.config.service = this.injector.get(this.config.serviceClass);
    }

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
    // update cellTemplates from rendered templates
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

  async preview({ id }, event: Event) {
    event.stopPropagation();
    event.preventDefault();

    const loading = await this.loadingController.create();
    await loading.present();

    this.config.service!.findById(id).subscribe(async entity => {
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
    event.stopPropagation();
    event.preventDefault();

    await this.currentActionsDropdown?.dismiss();

    this.currentActionsDropdown = await this.popoverController.create({
      component: EntityListDropdownComponent,
      event,
      translucent: true,
      dismissOnSelect: true,
      showBackdrop: false,
      componentProps: {
        entity,
        service: this.config.serviceClass,
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
        searchBar => !this.searchbars.find(s => s.prop === searchBar.prop),
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
      it => !this.searchbars.find(s => s.prop === it.prop),
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

  create() {
    this.store.dispatch(this.entityActions.wizard({}));
  }

  selectionType(): any {
    if (this.config.selection === 'single') {
      return SelectionType.single;
    } else if (this.config.selection === 'multiple') {
      return SelectionType.multiClick;
    } else {
      return undefined;
    }
  }

  onSelect({ selected }) {
    this.selected = {};
    for (const item of selected) {
      this.selected[item.id] = item;
    }

    this.pick.emit(this.selected);
  }

  selectedIds(): number[] {
    return Object.keys(this.selected) as any;
  }

  unselect(id: number) {
    delete this.selected[id];
    this.datatable.selected = this.datatable.selected.filter(e => e.id != id);
    this.datatable.recalculate();
  }
}
