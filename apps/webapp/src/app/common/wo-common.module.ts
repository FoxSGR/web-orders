import { NgModule } from '@angular/core';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HttpClientModule } from '@angular/common/http';

import * as directives from './directives';
import * as pipes from './pipes';

@NgModule({
  declarations: [directives.AutoFocusDirective, pipes.CastPipe],
  imports: [
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'],
    }),
    HttpClientModule,
  ],
  exports: [directives.AutoFocusDirective, pipes.CastPipe],
})
export class WOCommonModule {}
