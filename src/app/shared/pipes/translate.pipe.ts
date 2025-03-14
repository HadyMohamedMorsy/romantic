import { inject, Pipe, PipeTransform } from '@angular/core';
import { LangService } from '../services';

@Pipe({ name: 'translation'})
export class TranslationPipe implements PipeTransform {
  currentLang = inject(LangService).currentLanguage;

  transform(value: any, propName: string): any {
    const currentLang = this.currentLang();
    const key = `${propName}_${currentLang}`;
    return value[key];
  }
}
