import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
import { PopoverController, SelectChangeEventDetail } from '@ionic/angular';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
  SortType,
  TableColumn,
} from '@swimlane/ngx-datatable';
import { cloneDeep } from 'lodash';

import { IFindFilter, IFindParams } from '@web-orders/api-interfaces';
import { BaseComponent } from '../base.component';
import { Entity } from '../../models/entity';
import { EntityPage } from '../../wo-common.types';
import { EntityListDropdownComponent } from './entity-list-dropdown.component';
import { entityActions } from '../../store';
import { BasicCellComponent } from './cells';
import { ENTITY_LIST_TOKEN, EntityListCellData } from './entity-list.token';
import { EntityConfigRegister } from '../../entity-config.register';
import { EntityConfig, EntityType } from '../../types';
import {
  EntityListConfig,
  EntityListSearchable,
  EntityListSearchBar,
} from './entity-list.types';
import {
  AlertService,
  EntityPreviewService,
  EntityWizardService,
  ThemeService,
} from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'wo-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityListComponent<T extends Entity>
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  /**
   * Custom templates for cells.
   */
  @ViewChildren('templates') templates!: QueryList<TemplateRef<any>>;
  @ViewChild('datatable') datatable: DatatableComponent;

  /**
   * Whether the entity list is the main component of the current page.
   */
  @Input() standalone = false;

  /**
   * The type/name of the entities.
   */
  @Input() entityType: EntityType;

  /**
   * The config of the entity list.
   * @param value
   */
  @Input() set config(value: Partial<EntityListConfig<T>>) {
    this._config = value as EntityListConfig<T>;
  }
  get config(): EntityListConfig<T> {
    return this._config;
  }
  private _config: EntityListConfig<T>;

  /**
   * Config of the entity type.
   */
  entityConfig: EntityConfig<T>;

  /**
   * Additional data to pass to the service.
   */
  @Input() data?: any;

  /**
   * The picked entities, if selection is enabled.
   */
  @Input() pick: T[] = [];
  @Output() pickChange = new EventEmitter<T[]>();

  /**
   * Whether the entity list is activated.
   * If it's disabled, it will be in an idle state, e.g. requests won't be made
   */
  @Input() set enabled(value) {
    if (value && !this._enabled) {
      this.load({ page: 0 });
    }

    this._enabled = value;
  }
  get enabled() {
    return this._enabled;
  }
  private _enabled = true;

  /**
   * Status of the list.
   */
  status: 'unloaded' | 'loading' | 'loaded';

  /**
   * Enums to use in the template.
   */
  ColumnMode = ColumnMode;
  SortType = SortType;

  /**
   * Number of items per page.
   * @todo - increase
   * @todo - allow user to change
   */
  pageSize = 20;

  /**
   * The page being shown.
   */
  page: EntityPage<T> = {
    offset: 0,
    size: 0,
    items: [],
    total: 0,
  };

  /**
   * Entity sort data.
   */
  sort = {
    prop: 'id',
    direction: 'desc',
  };

  /**
   * The current search bar filters.
   */
  searchBars: EntityListSearchBar[];

  /**
   * Used to manage the actions dropdown popover.
   */
  private currentActionsDropdown: HTMLIonPopoverElement | null = null;

  /**
   * Actions for this entity type.
   */
  private entityActions!: ReturnType<typeof entityActions>;

  /**
   * Cache for the Angular injector for custom templates.
   */
  private injectorCache = {};

  constructor(
    injector: Injector,
    private readonly popoverController: PopoverController,
    private readonly previewService: EntityPreviewService,
    private readonly wizardService: EntityWizardService,
    private readonly themeService: ThemeService,
    private readonly alertService: AlertService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.entityConfig = EntityConfigRegister.getDefinition(this.entityType);
    this.config = {
      ...this.entityConfig.listConfig,
      ...cloneDeep(this.config),
    };

    // initialize the service
    if (!this.entityConfig.service && this.entityConfig.serviceClass) {
      this.entityConfig.service = this.injector.get(
        this.entityConfig.serviceClass,
      );
    }

    // translate column headers
    // using the pipe throws a nasty warning
    for (const column of this.config.columns) {
      if (column.name?.startsWith('str.')) {
        column.name = this.translate.instant(column.name);
      }
    }

    // setup searchbars
    this.searchBars = [
      {
        ...this.config.searchables[0],
        value: undefined,
      },
    ];
    if (!this.config.searchables.find(s => s.prop === 'id')) {
      this.config.searchables.push({
        prop: 'id',
        label: 'Id',
      });
    }

    this.status = 'unloaded';
    this.entityActions = entityActions(this.entityConfig.entityType);

    // load data
    if (this.enabled) {
      this.load({ page: 0 });
    }

    // initialize cell templates
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

    this.cdr.detectChanges();
  }

  /**
   * Track by function for columns and things with a prop.
   * @param _index
   * @param item
   */
  trackByProp(_index: number, item: any) {
    return item.prop;
  }

  /**
   * Loads a page.
   * @param param0
   */
  load({ page }: { page?: number } = {}): void {
    this.status = 'loading';
    page = page === undefined ? this.page.offset : page;

    const filter: IFindFilter[] = this.searchBars
      .filter(s => s.value?.trim())
      .map(s => ({
        prop: s.prop,
        type: 'contains',
        value: s.value,
      }));

    const params: IFindParams<T> = {
      offset: page * this.pageSize,
      filter,
      sortField: this.sort.prop,
      sortDirection: this.sort.direction as any,
    };

    let obs;
    if (this.config.findPage) {
      obs = this.config.findPage(this.entityConfig.service!, params, this.data);
    } else {
      obs = this.entityConfig.service!.findPage(params);
    }

    obs.subscribe({
      next: loadedPage => {
        if (!loadedPage) {
          return;
        }

        this.page = { ...loadedPage };
        this.page.offset /= this.pageSize;
        this.status = 'loaded';
        this.cdr.detectChanges();
      },
      error: error => {
        console.error(error);
        this.alertService.showAlert({
          message: 'str.list.errors.loading.message',
          type: 'error',
        });
        this.status = 'unloaded';
      },
    });
    this.store.dispatch(this.entityActions.loadPage());
  }

  /**
   * Opens a preview for an entity.
   * @param param0
   * @param event
   */
  preview({ id }, event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    this.previewService.previewEntity(
      id,
      this.entityConfig.entityType,
      !this.standalone,
    );
  }

  /**
   * Edit an entity.
   * @param entity
   * @param event
   */
  edit(entity: T, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.openWizard(entity);
  }

  /**
   * Opens a dropdown with options for an entity.
   * @param event
   * @param entity
   */
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
        entityConfig: this.entityConfig,
        refresh: () => this.load(),
      },
    });

    await this.currentActionsDropdown.present();
  }

  /**
   * Gets the injector for custom templates.
   * This is used to pass data to them.
   * @param column
   * @param entity
   * @returns
   */
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

  /**
   * Applies the current search.
   */
  search() {
    this.load();
  }

  /**
   * Changes the order.
   * @param param0
   */
  changeSort({ sorts }) {
    this.sort = { prop: sorts[0].prop, direction: sorts[0].dir };
    this.load();
  }

  /**
   * Finds the available search fields for a given search bar.
   * @param searchBar
   * @returns
   */
  availableSearchFields(
    searchBar: EntityListSearchBar,
  ): EntityListSearchable[] {
    return [
      searchBar,
      ...this.config.searchables.filter(
        searchBar => !this.searchBars.find(s => s.prop === searchBar.prop),
      ),
    ];
  }

  /**
   * Changes the field of a search bar.
   * @param searchBar
   * @param event
   * @returns
   */
  changeSearchbar(
    searchBar: EntityListSearchBar,
    event: CustomEvent<SelectChangeEventDetail<EntityListSearchBar>>,
  ) {
    const newSearchable = event.detail.value;

    // special case to remove
    if (newSearchable.prop === '#remove') {
      this.searchBars = this.searchBars.filter(s => s.prop !== searchBar.prop);
      if (searchBar.value?.trim()) {
        this.load();
      }
      return;
    }

    searchBar.prop = newSearchable.prop;
    searchBar.label = newSearchable.label;
    searchBar.choices = newSearchable.choices;

    if (searchBar.value?.trim()) {
      this.load();
    }
  }

  /**
   * Creates a search bar.
   */
  newSearchBar() {
    const searchable = this.config.searchables.find(
      it => !this.searchBars.find(s => s.prop === it.prop),
    );
    if (searchable) {
      this.searchBars.push({
        ...searchable,
        value: '',
      });
    }
  }

  /**
   * Finds which search fields are still available.
   * @returns
   */
  remainingSearchFields(): EntityListSearchable[] {
    return this.config.searchables.filter(
      searchable => !this.searchBars.find(s => s.prop === searchable.prop),
    );
  }

  /**
   * Opens the wizard to create an entity.
   */
  create() {
    this.openWizard();
  }

  /**
   * Maps the selection type in the config to the ngx-datatable enum value.
   * @returns
   */
  selectionType(): SelectionType | undefined {
    if (this.config.selection === 'single') {
      return SelectionType.single;
    } else if (this.config.selection === 'multiple') {
      return SelectionType.multiClick;
    } else {
      return undefined;
    }
  }

  /**
   * Handles a row select event.
   * @param param0
   * @returns
   */
  onSelect({ selected }) {
    // if the selection mode is 'single', unselect the previously selected value
    if (
      this.config.selection === 'single' &&
      selected[0]?.id &&
      selected[0]?.id === this.pick[0]?.id
    ) {
      this.unselect(selected[0].id);
      return;
    }

    this.pick = selected;
    this.updatePicked();
  }

  /**
   * Handles an activate event for a row.
   * @param event
   */
  onActivate(event: any) {
    if (event.type !== 'click' || this.selectionType()) {
      return;
    }

    this.preview(event.row);
  }

  /**
   * Checks whether an entity is selected.
   * @param id
   * @returns
   */
  isPicked(id: number): boolean {
    return !!this.pick.find(e => e.id === id);
  }

  /**
   * Unselects an entity.
   * @param id
   */
  unselect(id: number) {
    this.pick = this.pick.filter(e => e.id !== id);
    this.updatePicked();
  }

  /**
   * Whether dark theme is enabled.
   * @returns
   */
  isDarkTheme(): Observable<boolean> {
    return this.themeService.darkTheme$;
  }

  /**
   * Used to track rows.
   * @param row
   */
  rowIdentity(row: T) {
    return row.id;
  }

  /**
   * Updates the selected values.
   */
  private updatePicked() {
    // update the selected items in the datatable component
    // it is useful to use a different array to have a before vs after to unselect
    this.datatable.selected = [...this.pick];
    this.datatable.recalculate();
    this.pickChange.emit(this.pick);
  }

  /**
   * Opens the entity wizard.
   * @param entity
   * @private
   */
  private openWizard(entity?: T) {
    this.wizardService.openWizard(
      this.entityType,
      this.standalone ? 'routed' : 'standalone',
      entity?.id,
      { onComplete: () => this.load() },
    );
  }
}
