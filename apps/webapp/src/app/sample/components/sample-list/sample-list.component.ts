import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { sampleListConfig } from '../../sample.list.config';

@Component({
  selector: 'wo-sample-list',
  templateUrl: './sample-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleListComponent {
  config = sampleListConfig;
}
