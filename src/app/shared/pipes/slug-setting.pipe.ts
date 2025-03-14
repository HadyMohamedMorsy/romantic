import { inject, Pipe, PipeTransform } from '@angular/core';
import { LangService } from '../services';

@Pipe({
  name: 'findBySlug'
})
export class FindBySlugPipe implements PipeTransform {
  currentLang = inject(LangService).currentLanguage;

  transform(
    settings: any[],
    slug: string,
    propEn: string,
    propAr: string,
  ): any {
    if (!settings || !slug) {
      return null;
    }
    const foundSetting = settings.find((setting) => setting.slug === slug);
    if (!foundSetting) {
      return null;
    }
    return this.currentLang() === 'ar'
      ? foundSetting[propAr]
      : foundSetting[propEn];
  }
}
