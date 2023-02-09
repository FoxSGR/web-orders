import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { BaseComponent } from '../base.component';
import { SmartForm, SmartFormState } from '../../types';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'wo-smart-form',
  templateUrl: './smart-form.component.html',
  styleUrls: ['./smart-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFormComponent extends BaseComponent implements OnInit {
  /**
   * Structure of the smart form.
   */
  @Input()
  definition: SmartForm;

  /**
   * State of the form.
   */
  @Input() state: SmartFormState;
  @Output() stateChange = new EventEmitter<SmartFormState>();

  /**
   * Observable for items keep up with changes.
   */
  change = new Subject<SmartFormState>();

  override ngOnInit() {
    super.ngOnInit();

    this.stateChange
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(state => this.change.next(state));
  }
}
