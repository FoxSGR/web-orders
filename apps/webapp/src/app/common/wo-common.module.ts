import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import * as components from './components';
import * as directives from './directives';
import * as pipes from './pipes';

@NgModule({
  declarations: [
    components.EntityPreviewActionComponent,
    components.EntityPreviewCloseComponent,
    components.EntityPreviewListComponent,
    directives.AutoFocusDirective,
    pipes.CastPipe,
    pipes.DatePipe,
  ],
  imports: [
    CommonModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'],
    }),
    HttpClientModule,
    IonicModule,
    TranslateModule,
  ],
  exports: [
    components.EntityPreviewActionComponent,
    components.EntityPreviewCloseComponent,
    components.EntityPreviewListComponent,
    directives.AutoFocusDirective,
    pipes.CastPipe,
  ],
})
export class WOCommonModule {}
