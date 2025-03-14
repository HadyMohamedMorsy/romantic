import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class StaticDataService {
  #translate = inject(TranslateService);

  public languages = [
    { value: 1, label: 'EN' },
    { value: 2, label: 'AR' },
  ];
}
