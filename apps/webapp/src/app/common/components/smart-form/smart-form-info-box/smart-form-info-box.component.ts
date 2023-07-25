import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs';

import { SmartFormInfoBox } from '../../../types';
import { WOItemMap } from '../../../wo-common.types';
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
  result: WOItemMap = {};

  override ngOnInit() {
    super.ngOnInit();

    this.change
      .pipe(
        takeUntil(this.ngDestroyed$),
        debounceTime(this.definition.debounce || 1000),
      )
      .subscribe(() => this.calculateResult());

    setTimeout(() => this.calculateResult(), 5000);
  }

  private calculateResult() {
    this.result = this.definition.execute(this.state, this.injector);
    this.cdr.detectChanges();
  }
}
