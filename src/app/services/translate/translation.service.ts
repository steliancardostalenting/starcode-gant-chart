import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // Set default language
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  translateKey(key: string) {
    return this.translate.instant(key);
  }
}
