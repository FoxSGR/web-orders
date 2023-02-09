import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs';

import { SmartFormInfoBox } from '../../../types';
import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';

@Component({
  selector: 'wo-smart-form-info-box',
  templateUrl: './smart-form-info-box.component.html',
  styleUrls: ['./smart-form-info-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFormInfoBoxComponent
  extends SmartFormAbstractItemComponent<void, SmartFormInfoBox>
  implements OnInit
{
  result: any = {};

  override ngOnInit() {
    super.ngOnInit();

    this.change
      .pipe(
        takeUntil(this.ngDestroyed$),
        debounceTime(this.definition.debounce || 0),
      )
      .subscribe(() => this.calculateResult());

    this.calculateResult();
  }

  private calculateResult() {
    this.result = this.definition.execute(this.state);
  }
}
