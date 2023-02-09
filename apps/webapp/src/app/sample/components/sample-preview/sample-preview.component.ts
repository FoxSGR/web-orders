import { Component } from '@angular/core';

import { EntityPreviewComponent, ShoeSample } from '../../../common';

@Component({ templateUrl: './sample-preview.component.html' })
export class SamplePreviewComponent extends EntityPreviewComponent<ShoeSample> {}
