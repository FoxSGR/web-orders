import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, IonPopover } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { deburr } from 'lodash';
import * as uuid from 'uuid';

import { SelectSearchOption } from './select-search.types';
import { adjustPopover } from '../../util';

@Component({
  selector: 'wo-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule,
    ScrollingModule,
  ],
  standalone: true,
})
export class SelectSearchComponent<T = any>
  implements OnInit, AfterViewInit, OnChanges
{
  ITEM_SIZE = 48;

  uid = uuid.v4();

  @Input() disabled: boolean;
  @Input() label?: string;
  @Input() placeholder: string;

  @Input()
  set model(value: T) {
    const previousValue = this._model;
    this._model = value;
    if (value !== previousValue) {
      this.updateSelectedOption();
    }
  }
  get model(): T {
    return this._model;
  }
  private _model: T;
  @Output() modelChange = new EventEmitter<T>();

  @Input() set options(value: SelectSearchOption[] | undefined) {
    const previousValue = this._options;
    this._options = value;

    if (!previousValue) {
      this._options = value;
      this.updateSelectedOption();
      this.updateFilteredOptions();
    }
  }
  get options(): SelectSearchOption[] | undefined {
    return this._options;
  }
  _options?: SelectSearchOption[];

  filter: string;
  filteredOptions: SelectSearchOption[];

  selectedOption: SelectSearchOption | undefined = undefined;

  @ViewChild('popover', { read: IonPopover })
  popover: IonPopover;

  get searchEnabled(): boolean {
    return !!this.options && this.options.length >= 10;
  }

  ngOnInit() {
    this.updateSelectedOption();
  }

  ngAfterViewInit() {
    this.popover.didPresent.subscribe(() => {
      // tweak styles of the cdk virtual scroll wrapper
      // cannot be done via css because of the shadow dom
      const cdkWrapper = this.popover['el'].querySelector(
        '.cdk-virtual-scroll-content-wrapper',
      ) as HTMLElement;
      if (cdkWrapper) {
        cdkWrapper.style.width = '100%';
      }

      // focus the search input
      const searchInput = this.popover['el'].querySelector(
        '.wo-select-search-search-input',
      ) as HTMLIonItemElement;
      if (searchInput) {
        searchInput.focus();
      }
    });
  }

  ngOnChanges() {
    this.updateSelectedOption();
  }

  onChange() {
    this.updateSelectedOption();
    this.updateFilteredOptions();
    this.modelChange.emit(this.model);
  }

  trackBy(_index: number, option: SelectSearchOption) {
    return option.id;
  }

  updateFilteredOptions() {
    if (!this.options) {
      return;
    }

    if (!this.filter?.trim()) {
      this.filteredOptions = [...this.options];
      return;
    }

    const deburrFilter = deburr(this.filter).trim().toLocaleLowerCase();
    this.filteredOptions = this.options.filter(option =>
      deburr(option.label).toLocaleLowerCase().includes(deburrFilter),
    );
  }

  private updateSelectedOption() {
    if (!this.options) {
      return;
    }

    if (!this.model) {
      this.selectedOption = undefined;
      return;
    }

    this.selectedOption = this.options.find(
      option => option.value === this.model,
    );
  }
}
