import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import * as components from './components';
import * as directives from './directives';
import * as pipes from './pipes';

@NgModule({
  declarations: [
    components.EntityListDropdownComponent,
    directives.AutoFocusDirective,
    pipes.CastPipe,
  ],
  imports: [
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'],
    }),
    HttpClientModule,
    IonicModule,
    TranslateModule,
  ],
  exports: [directives.AutoFocusDirective, pipes.CastPipe],
})
export class WOCommonModule {}
