import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
} from '@angular/core';
import { cloneDeep, isEqualWith } from 'lodash';
import * as uuid from 'uuid';

import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';
import { SmartFormMultiple } from '../../../types';
import { customEquals } from '../../../util';

@Component({
  selector: 'wo-smart-form-multiple',
  templateUrl: './smart-form-multiple.component.html',
  styleUrls: ['./smart-form-multiple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFormMultipleComponent
  extends SmartFormAbstractItemComponent<any[], SmartFormMultiple>
  implements OnInit, OnChanges
{
  /**
   * Whether a new element can be created.
   */
  canAdd = false;

  /**
   * Whether an element is being dragged.
   */
  set dragging(value: boolean) {
    this._dragging = value;
  }
  get dragging(): boolean {
    return this._dragging;
  }
  private _dragging = false;

  override ngOnInit() {
    super.ngOnInit();
    this.assignUids();
    this.updateCanAdd();
  }

  override ngOnChanges(): void {
    super.ngOnChanges();
    this.updateCanAdd();
    this.assignUids();
  }

  childProp(index: number): string {
    return `${this.prop}.${index}`;
  }

  add() {
    const newItem = cloneDeep(this.definition.default);

    this.value!.push(newItem);
    this.stateChange.emit(this.state);
    this.assignUid(newItem);
    this.updateCanAdd();
  }

  remove(index: number) {
    if (this.value!.length === 1) {
      this.value![0] = cloneDeep(this.definition.default);
    } else {
      this.value!.splice(index, 1);
    }

    this.stateChange.emit(this.state);
    this.updateCanAdd();
  }

  isHidden(index: number): boolean {
    if (!this.definition.children[index]?.hidden) {
      return false;
    }

    return this.definition.children[index].hidden(
      this.state,
      this.childProp(index),
    );
  }

  updateCanAdd() {
    if (!this.value) {
      this.canAdd = false;
      return;
    }

    if (this.value.length === 0) {
      this.canAdd = true;
      return;
    }

    this.canAdd = !isEqualWith(
      this.value[this.value.length - 1],
      this.definition.default,
      (a, b) => customEquals(a, b),
    );
  }

  handleReorder(event: any) {
    const old = this.value!.splice(event.detail.from, 1)[0];
    this.value!.splice(event.detail.to, 0, old);
    event.detail.complete();

    this.onChange();
    this.updateCanAdd();
  }

  protected override checkValue() {
    const val = this.value;
    if (!val || !Array.isArray(val)) {
      this.value = [cloneDeep(this.definition.default)];
      this.updateCanAdd();
      this.assignUids();
    }
  }

  private assignUids() {
    if (!this.value) {
      return;
    }

    for (const item of this.value) {
      this.assignUid(item);
    }
  }

  private assignUid(item: any) {
    if (!item['_uid']) {
      item['_uid'] = uuid.v4();
    }
  }
}
