import { Directive, Inject, OnInit } from '@angular/core';
import { get } from 'lodash';

import { Entity } from '../../../models/entity';
import { ENTITY_LIST_TOKEN, EntityListCellData } from '../entity-list.token';
import { EntityListAbstractColumn } from '../entity-list.types';

@Directive()
export class CellComponent<
  T extends Entity = Entity,
  S extends EntityListAbstractColumn<T> = EntityListAbstractColumn<T>,
> implements OnInit
{
  /**
   * Whether the cell should be shown.
   */
  private show = true;

  constructor(
    @Inject(ENTITY_LIST_TOKEN) public data: EntityListCellData<T, S>,
  ) {}

  ngOnInit() {
    this.show =
      !this.data.column.hide || !this.data.column.hide(this.data.entity);
  }

  /**
   * Gets and processes the value that matches a prop.
   * @param prop
   */
  getValue(prop: string = this.data.column.prop! as string): any {
    let value = get(this.data.entity, prop);

    if (this.data.column.pipe) {
      value = this.data.column.pipe.transform(value);
    }

    return value;
  }

  /**
   * Whether the cell should be shown.
   */
  shouldShow(): boolean {
    return this.show;
  }
}
