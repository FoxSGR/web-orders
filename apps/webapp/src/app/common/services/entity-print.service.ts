import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import { Entity } from '../models/entity';
import { EntityConfig, EntityType, FileData } from '../types';
import { EntityConfigRegister } from '../entity-config.register';
import {
  EntityPreviewConfig,
  EntityPreviewGroup,
  EntityPreviewItem,
  EntityPreviewItemGroup,
  EntityPreviewItemTable,
} from '../components';
import { EntityPreviewService } from './entity-preview.service';
import { FileService } from './file.service';
import { AlertService } from './alert.service';
import { get } from 'lodash';

@Injectable({ providedIn: 'root' })
export class EntityPrintService {
  private entity: Entity;
  private entityConfig: EntityConfig<Entity>;
  private previewData: EntityPreviewConfig;

  constructor(
    private translateService: TranslateService,
    private loadingController: LoadingController,
    private previewService: EntityPreviewService,
    private fileService: FileService,
    private alertService: AlertService,
  ) {}

  async printEntity(entity: Entity, entityType: EntityType) {
    this.entity = entity;
    this.entityConfig = EntityConfigRegister.getDefinition(entityType);
    this.previewData = this.entityConfig.previewConfig!(entity, true);

    const loading = await this.loadingController.create();
    loading.present();

    try {
      const html = await this.generateHtml();

      const previewFrame = document.createElement(
        'IFRAME',
      ) as HTMLIFrameElement;
      document.body.appendChild(previewFrame);
      previewFrame.contentDocument!.documentElement.innerHTML = html;

      // wait for the document to load
      await new Promise<void>(r => setTimeout(() => r(), 3000));
      if (previewFrame.contentDocument!.readyState !== 'complete') {
        await new Promise<void>(r =>
          previewFrame.contentWindow!.addEventListener('load', () => r()),
        );
      }

      previewFrame.contentWindow!.print();
    } catch (e) {
      this.alertService.showAlert({
        type: 'error',
        message: 'str.entity.preview.print.error.message',
      });
      console.error(e);
    } finally {
      loading.dismiss();
    }
  }

  private async generateHtml(): Promise<string> {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

            * {
              font-family: 'Roboto', sans-serif;
            }

            h2 {
              font-weight: 500;
            }

            small {
              font-weight: 400;
            }

            p, td, th {
              margin-bottom: 0 !important;
              font-size: 12px;
            }

            .entity-print-group {
              margin-bottom: 10px;
            }

            .entity-print-item {
              margin-top: 5px;
              margin-bottom: 5px;
              page-break-inside: avoid;
            }

            @media print {
              .col-sm-1 {
                flex: 0 0 8.33333%;
                max-width: 8.33333%;
              }
              .col-sm-2 {
                flex: 0 0 16.66667%;
                max-width: 16.66667%;
              }
              .col-sm-3 {
                flex: 0 0 25%;
                max-width: 25%;
              }
              .col-sm-4 {
                flex: 0 0 33.33333%;
                max-width: 33.33333%;
              }
              .col-sm-5 {
                flex: 0 0 41.66667%;
                max-width: 41.66667%;
              }
              .col-sm-6 {
                flex: 0 0 50%;
                max-width: 50%;
              }
              .col-sm-7 {
                flex: 0 0 58.33333%;
                max-width: 58.33333%;
              }
              .col-sm-8 {
                flex: 0 0 66.66667%;
                max-width: 66.66667%;
              }
              .col-sm-9 {
                flex: 0 0 75%;
                max-width: 75%;
              }
              .col-sm-10 {
                flex: 0 0 83.33333%;
                max-width: 83.33333%;
              }
              .col-sm-11 {
                flex: 0 0 91.66667%;
                max-width: 91.66667%;
              }
              .col-sm-12 {
                flex: 0 0 100%;
                max-width: 100%;
              }
            }
          </style>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossorigin="anonymous"
          />
        </head>
        <body>
          ${await this.generateHeader()} ${await this.generateContent()}
        </body>
      </html>
    `;
  }

  private async generateHeader(): Promise<string> {
    const title = await this.translate(this.previewData.header.title);

    const subTitle = this.previewData.header.subTitle
      ? `<small>${this.previewData.header.subTitle}</small>`
      : '';

    return `
      <div class="entity-print-header">
        <h3>${title} ${subTitle}</h3>
      </div>
    `;
  }

  private async generateContent(): Promise<string> {
    let groups = '';
    for (const group of this.previewData.groups) {
      groups += await this.generateGroup(group);
    }

    return `
      <div class="entity-print-content">
        ${groups}
      </div>
    `;
  }

  private async generateGroup(group: EntityPreviewGroup): Promise<string> {
    // ignore collapsable groups
    if (group.collapsable) {
      return '';
    }

    let header = '';
    if (group.header) {
      const title = await this.translate(group.header.title);
      header = `<h5 style="font-size: 14px">${title}</h5>`;
    }

    let groupContent = '';

    if (group.type === 'groups') {
      for (const item of group.items) {
        groupContent += await this.generateGroup(item as EntityPreviewGroup);
      }
    } else {
      groupContent += await this.generateItemList(
        group as EntityPreviewItemGroup,
      );
    }

    return `
      <div class="entity-print-group">
        ${header}
        ${groupContent}
      </div>
    `;
  }

  private async generateItemList(
    group: EntityPreviewItemGroup,
  ): Promise<string> {
    let columns = '';
    for (let i = 0; i < group.items.length; i++) {
      columns += await this.generateItem(group.items[i], group, i);
    }

    return `
      <div class="row">
        ${columns}
      </div>
    `;
  }

  private async generateItem(
    item: EntityPreviewItem,
    group: EntityPreviewItemGroup,
    index: number,
  ): Promise<string> {
    if (item.hidden?.(this.entity)) {
      return '';
    }

    if (item.type === 'photo') {
      return this.generatePhotoItem(item.value as any);
    }

    const value: any = await firstValueFrom(
      this.previewService.itemValue(item, this.entity),
    );

    let label = '';
    if (item.label) {
      label = await this.translate(item.label);
      if (group.showIndex && group.items.length > 1) {
        label += ` ${index + 1}`;
      }

      if (!value || typeof value !== 'object' || item.type === 'color') {
        label += ':';
      }

      label = `
        <p style="display: inline; font-weight: 500; margin: 0">
          ${label}
        </p>
      `;
    }

    return `
      <div class="entity-print-item col-sm-${12 / (group.columns || 2)}">
        ${label}
        ${await this.generateItemValueContent(item, value)}
      </div>
    `;
  }

  private async generateItemValueContent(
    item: EntityPreviewItem,
    value: any,
  ): Promise<string> {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      if (item['emptyText']) {
        return `<p>${await this.translate(item['emptyText'])}</p>`;
      }

      return '';
    }

    if (item.type === 'map') {
      return this.generateMapValue(value);
    } else if (item.type === 'table') {
      return this.generateTableValue(item, value);
    } else {
      const display = item.type === 'text' ? 'block' : 'inline';
      return `
        <p style="white-space: normal; display: ${display};">
          ${value}
        </p>
      `;
    }
  }

  private async generateMapValue(value: any): Promise<string> {
    let items = '';

    for (const [key, itemValue] of Object.entries(value)) {
      if (!itemValue) {
        continue;
      }

      const title = await this.translate(key);
      const itemValueStr = await this.translate(itemValue as string);

      items += `
          <p style="white-space: normal">
            <span style="font-weight: 400">${title}:</span>
            <span style="font-weight: 300">${itemValueStr}</span>
          </p>
        `;
    }

    return `
        <div style="margin-top: 5px">
          ${items}
        </div>
      `;
  }

  private async generateTableValue(
    item: EntityPreviewItemTable,
    values: any[],
  ): Promise<string> {
    let items = '';

    for (const value of values) {
      items += await this.generateTableRow(item.columns, value);
    }

    return `
      <table class="table table-bordered table-sm">
        <thead>
          ${await this.generateTableRow(item.columns)}
        </thead>
        <tbody>
          ${items}
        </tbody>
      </table>
    `;
  }

  private async generateTableRow(
    columns: EntityPreviewItemTable['columns'],
    model?: any,
  ): Promise<string> {
    let result = '<tr>';

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];

      let value: string;
      if (model) {
        value = get(model, column.prop);
      } else {
        value = await this.translate(column.label);
      }

      let scope = '';
      if (!model) {
        scope = 'scope="col"';
      } else if (i === 0) {
        scope = 'scope="row"';
      }

      const element = model && i !== 0 ? 'td' : 'th';

      result += `
        <${element} ${scope}>
          ${value}
        </${element}>
      `;
    }

    return result + '</tr>';
  }

  private generatePhotoItem(value: FileData) {
    const src = this.fileService.buildUrl(value);

    return `
      <div style="height: 120px; width: 100%">
        <img
          src="${src}"
          style="
            height: 100%;
            width: 100%;
            object-fit: contain;
            object-position: left;
          "
        >
      </div>
    `;
  }

  private async translate(key: string): Promise<string> {
    if (!key) return '';
    return firstValueFrom(this.translateService.get(key));
  }
}
