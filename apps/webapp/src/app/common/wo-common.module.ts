import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import * as directives from './directives';
import { EntityPreviewModule } from './components/entity-preview/entity-preview.module';

@NgModule({
  declarations: [directives.AutoFocusDirective],
  imports: [
    CommonModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'],
    }),
    EntityPreviewModule,
  ],
  exports: [directives.AutoFocusDirective],
})
export class WOCommonModule {}
