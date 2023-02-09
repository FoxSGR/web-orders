import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { IonicModule, IonImg } from '@ionic/angular';
import * as uuid from 'uuid';

@Component({
  selector: 'wo-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  imports: [NgStyle, IonicModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailComponent implements AfterViewInit, OnChanges {
  @ViewChild('img', { read: IonImg }) img: IonImg;

  @Input() file?: File;
  @Input() url?: string;

  @Input() name: string;
  @Input() showTitle = false;

  @Input() size = '100px';

  loaded = false;

  get id() {
    return `woThumbnail${this.uid}`;
  }

  private uid = uuid.v4();

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.load();
  }

  ngOnChanges() {
    this.load();
  }

  private async load() {
    if (this.loaded || !this.img || (!this.file && !this.url)) {
      return;
    }

    if (this.file) {
      const reader = new FileReader();
      await new Promise<void>(resolve => {
        reader.onloadend = () => {
          this.img.src = reader.result as string;
          resolve();
        };
        reader.readAsDataURL(this.file!);
      });
    } else if (this.url) {
      // must be marked as loaded right after the URL is set otherwise ionic
      // will not load the image
      this.img.src = this.url;

      // for some reason another markForCheck is required
      setTimeout(() => this.cdr.markForCheck());
    }

    this.loaded = true;

    // markForCheck allows parents to quickly know if it was loaded
    this.cdr.markForCheck();
  }

  onClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
