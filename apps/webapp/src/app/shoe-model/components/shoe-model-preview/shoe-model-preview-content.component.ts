import { Component, Input } from '@angular/core';
import { ShoeModel } from '../../../common';

@Component({
  selector: 'wo-model-preview-content',
  templateUrl: './shoe-model-preview-content.component.html',
})
export class ShoeModelPreviewContentComponent {
  @Input()
  shoeModel: ShoeModel;
}
