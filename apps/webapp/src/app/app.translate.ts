import { TranslateLoader } from '@ngx-translate/core';
import { from } from 'rxjs';

export const translate = {
  defaultLanguage: 'pt_PT',
  loader: {
    provide: TranslateLoader,
    useClass: class {
      // noinspection JSUnusedGlobalSymbols
      getTranslation = (lang: string) =>
        from(import(`../assets/i18n/${lang}.json`));
    },
  },
};
